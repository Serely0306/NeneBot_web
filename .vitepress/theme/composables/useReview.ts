import { ref } from 'vue'
import { useUploadApi } from './useUploadApi'

interface Application {
  id: string
  group_id: string
  group_name?: string
  applicant: string
  applicant_nickname?: string
  purpose: string
  status: 'pending' | 'approved' | 'rejected'
  member_count: number
  client_ip: string
  admin_note?: string
  created_at: string
  verified?: boolean | null
  verification_note?: string
  verified_at?: string
}

interface IpMeta {
  ip_blacklist: string[]
  ip_fake_counts: Record<string, number>
}

export function useReview() {
  const { buildApiUrl } = useUploadApi()
  const applyApiBase = () => buildApiUrl('apply')

  const token = ref('')
  const unlocked = ref(false)
  const tokenInput = ref('')

  const currentStatus = ref('')
  const showDeleted = ref(false)
  const records = ref<Application[]>([])
  const totalCount = ref(0)
  const loading = ref(false)
  const actionMessage = ref({ text: '', type: '' })

  const ipMeta = ref<IpMeta>({ ip_blacklist: [], ip_fake_counts: {} })
  const ipPanelOpen = ref(false)
  const newIpInput = ref('')

  async function api(path: string, options?: RequestInit): Promise<Response | null> {
    const opts = options || {}
    if (!opts.headers) opts.headers = {}
    if (token.value) (opts.headers as Record<string, string>)['X-Admin-Token'] = token.value
    const resp = await fetch(path, opts)
    if (resp.status === 403) {
      lock()
      return null
    }
    return resp
  }

  function lock() {
    token.value = ''
    unlocked.value = false
    tokenInput.value = ''
  }

  async function unlock() {
    const key = tokenInput.value.trim()
    if (!key) return
    const resp = await fetch(applyApiBase() + '/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: key }),
    })
    if (resp.ok) {
      token.value = key
      unlocked.value = true
      await Promise.all([loadList(), loadIpMeta()])
    }
  }

  let actionMessageTimer: ReturnType<typeof setTimeout> | null = null

  function showActionMessage(text: string, type: string) {
    if (actionMessageTimer) clearTimeout(actionMessageTimer)
    actionMessage.value = { text, type }
    actionMessageTimer = setTimeout(() => {
      actionMessage.value = { text: '', type: '' }
    }, 5000)
  }

  async function readErrorMessage(resp: Response): Promise<string> {
    try {
      const ct = (resp.headers.get('Content-Type') || '').toLowerCase()
      if (ct.includes('application/json')) {
        const data = await resp.json()
        return data?.error || data?.message || `HTTP ${resp.status}`
      }
      return (await resp.text()).trim() || `HTTP ${resp.status}`
    } catch {
      return `HTTP ${resp.status}`
    }
  }

  async function loadList() {
    loading.value = true
    const params: string[] = []
    if (currentStatus.value) params.push('status=' + currentStatus.value)
    if (showDeleted.value) params.push('show_deleted=1')
    const query = params.length ? '?' + params.join('&') : ''
    const resp = await api(applyApiBase() + '/list' + query)
    if (resp) {
      const data = await resp.json()
      if (Array.isArray(data)) {
        records.value = data
        totalCount.value = data.length
      }
    }
    loading.value = false
  }

  async function loadIpMeta() {
    const resp = await api(applyApiBase() + '/meta')
    if (resp) {
      const data = await resp.json()
      ipMeta.value = {
        ip_blacklist: Array.isArray(data?.ip_blacklist) ? data.ip_blacklist : [],
        ip_fake_counts: (data?.ip_fake_counts && typeof data.ip_fake_counts === 'object') ? data.ip_fake_counts : {},
      }
    }
  }

  function setFilter(status: string) {
    showDeleted.value = false
    currentStatus.value = status
    loadList()
  }

  function toggleDeleted() {
    showDeleted.value = !showDeleted.value
    loadList()
  }

  async function approve(id: string) {
    const note = prompt('审核备注（可选）：')
    if (note === null) return
    const resp = await api(applyApiBase() + '/' + id + '/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_note: note.trim() }),
    })
    if (!resp) return
    if (resp.ok) { await loadList(); showActionMessage('已通过申请', 'success') }
    else showActionMessage(await readErrorMessage(resp), 'error')
  }

  async function rejectApp(id: string) {
    const note = prompt('拒绝原因（可选，将展示给申请人）：')
    if (note === null) return
    const resp = await api(applyApiBase() + '/' + id + '/reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_note: note.trim() }),
    })
    if (!resp) return
    if (resp.ok) { await loadList(); showActionMessage('已拒绝申请', 'success') }
    else showActionMessage(await readErrorMessage(resp), 'error')
  }

  async function revokeApp(id: string) {
    const resp = await api(applyApiBase() + '/' + id + '/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_note: '管理员撤销' }),
    })
    if (!resp) return
    if (resp.ok) { await loadList(); showActionMessage('已撤销到待审核状态', 'success') }
    else showActionMessage(await readErrorMessage(resp), 'error')
  }

  async function editNote(id: string) {
    const note = prompt('编辑备注：')
    if (note === null) return
    const resp = await api(applyApiBase() + '/' + id + '/note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_note: note.trim() }),
    })
    if (!resp) return
    if (resp.ok) { await loadList(); showActionMessage('备注已更新', 'success') }
    else showActionMessage(await readErrorMessage(resp), 'error')
  }

  async function deleteApp(id: string) {
    if (!confirm('确认删除此申请记录？')) return
    const resp = await api(applyApiBase() + '/' + id + '/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!resp) return
    if (resp.ok) { await loadList(); showActionMessage('申请记录已删除', 'success') }
    else showActionMessage(await readErrorMessage(resp), 'error')
  }

  async function ipRemove(ip: string) {
    if (!confirm('确认将 ' + ip + ' 移出黑名单？')) return
    const resp = await api(applyApiBase() + '/meta/ip-blacklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', ip }),
    })
    if (resp && resp.ok) await loadIpMeta()
  }

  async function ipAdd() {
    const ip = newIpInput.value.trim()
    if (!ip) return
    if (!confirm('确认封禁 IP ' + ip + '？')) return
    const resp = await api(applyApiBase() + '/meta/ip-blacklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', ip }),
    })
    if (resp && resp.ok) {
      newIpInput.value = ''
      await loadIpMeta()
    }
  }

  function statusLabel(s: string): string {
    const map: Record<string, string> = { pending: '待审核', approved: '已通过', rejected: '已拒绝' }
    return map[s] || s
  }

  function groupAvatar(id: string): string {
    return 'https://p.qlogo.cn/gh/' + id + '/' + id + '/100'
  }

  function userAvatar(qq: string): string {
    return 'https://q.qlogo.cn/headimg_dl?dst_uin=' + qq + '&spec=100'
  }

  function escapeHtml(str: string): string {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  return {
    token,
    unlocked,
    tokenInput,
    currentStatus,
    showDeleted,
    records,
    totalCount,
    loading,
    actionMessage,
    ipMeta,
    ipPanelOpen,
    newIpInput,
    unlock,
    lock,
    setFilter,
    toggleDeleted,
    approve,
    rejectApp,
    revokeApp,
    editNote,
    deleteApp,
    ipRemove,
    ipAdd,
    loadList,
    statusLabel,
    groupAvatar,
    userAvatar,
    escapeHtml,
  }
}
