import { ref } from 'vue'
import { useUploadApi } from './useUploadApi'

interface ApplyResult {
  group_id: string
  purpose: string
  member_count?: number
  admin_note?: string
  status: 'pending' | 'approved' | 'rejected'
}

export function useApply() {
  const { buildApiUrl, postJson } = useUploadApi()
  const applyApiBase = () => buildApiUrl('apply')

  const formData = ref({ group_id: '', purpose: '', applicant: '' })
  const submitting = ref(false)
  const message = ref({ text: '', type: '' })

  const queryQQ = ref('')
  const queryResults = ref<ApplyResult[]>([])
  const querying = ref(false)
  const queryError = ref<string>('')

  async function submitApplication() {
    submitting.value = true
    message.value = { text: '', type: '' }

    try {
      const resp = await fetch(applyApiBase(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData.value),
      })
      const result = await resp.json()
      if (resp.ok && result.success) {
        message.value = { text: '申请已提交！', type: 'success' }
        formData.value = { group_id: '', purpose: '', applicant: '' }
      } else {
        message.value = { text: result.error || '提交失败', type: 'error' }
      }
    } catch {
      message.value = { text: '网络错误，请重试', type: 'error' }
    } finally {
      submitting.value = false
    }
  }

  async function queryStatus() {
    const qq = queryQQ.value.trim()
    if (!qq || !/^\d+$/.test(qq)) {
      queryError.value = 'invalid'
      queryResults.value = []
      return
    }

    querying.value = true
    queryError.value = ''
    try {
      const resp = await fetch(applyApiBase() + '/status?applicant=' + encodeURIComponent(qq))
      const results = await resp.json()
      queryResults.value = Array.isArray(results) ? results : []
    } catch {
      queryError.value = 'network'
      queryResults.value = []
    } finally {
      querying.value = false
    }
  }

  const statusLabels: Record<string, string> = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
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
    formData,
    submitting,
    message,
    queryQQ,
    queryResults,
    querying,
    queryError,
    submitApplication,
    queryStatus,
    statusLabels,
    escapeHtml,
  }
}
