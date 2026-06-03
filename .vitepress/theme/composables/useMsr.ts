import { ref, computed } from 'vue'
import { useUploadApi } from './useUploadApi'

interface BoundAccount {
  game_id: string
  display_id: string
  index: number
  is_main: boolean
}

export function useMsr() {
  const { buildApiUrl, postJson } = useUploadApi()
  const verified = ref(false)
  const accessKey = ref('')
  const validating = ref(false)
  const region = ref('cn')
  const qqId = ref('')
  const querying = ref(false)
  const boundAccounts = ref<BoundAccount[]>([])
  const selectedAccount = ref<BoundAccount | null>(null)
  const rendering = ref(false)
  const resultUrl = ref<string | null>(null)
  const resultMetaText = ref('')
  const message = ref({ text: '', type: '' })
  const queryResultMessage = ref('')
  const queryResultType = ref<'success' | 'error' | ''>('')

  const canQuery = computed(() => verified.value && qqId.value.trim().length > 0)
  const canRender = computed(() => verified.value && selectedAccount.value !== null)

  function showMessage(text: string, type: string) {
    message.value = { text, type }
  }

  function hideMessage() {
    message.value = { text: '', type: '' }
  }

  function resetResult() {
    if (resultUrl.value) {
      URL.revokeObjectURL(resultUrl.value)
      resultUrl.value = null
    }
  }

  async function validateAccessKey() {
    const key = accessKey.value.trim()
    if (!key) { showMessage('请输入 access_key', 'error'); return }

    validating.value = true
    hideMessage()

    try {
      const resp = await postJson('msr/validate_access_key', { access_key: key })
      const data = await resp.json()
      if (!resp.ok || !data.success) throw new Error(data.error || `HTTP ${resp.status}`)
      verified.value = true
      hideMessage()
    } catch (e: any) {
      showMessage(`access_key 验证失败: ${e.message}`, 'error')
    } finally {
      validating.value = false
    }
  }

  async function queryBinding() {
    const qq = qqId.value.trim()
    if (!qq) { showMessage('请输入 QQ 号', 'error'); return }
    if (!/^\d+$/.test(qq)) { showMessage('QQ 号格式不正确', 'error'); return }

    querying.value = true
    hideMessage()
    resetResult()
    boundAccounts.value = []
    selectedAccount.value = null

    try {
      const resp = await postJson('query_binding', { qq_id: qq, region: region.value })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`)
      if (!data.success) throw new Error(data.error || '未找到绑定账号')

      queryResultMessage.value = `查询成功，找到 ${data.accounts.length} 个绑定账号`
      queryResultType.value = 'success'
      boundAccounts.value = data.accounts
    } catch (e: any) {
      queryResultMessage.value = `查询失败: ${e.message}`
      queryResultType.value = 'error'
    } finally {
      querying.value = false
    }
  }

  function selectAccount(account: BoundAccount) {
    selectedAccount.value = account
  }

  async function renderMsr() {
    if (!selectedAccount.value) return

    rendering.value = true
    hideMessage()
    resetResult()

    try {
      const resp = await fetch(buildApiUrl('msr/query'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qq_id: qqId.value.trim(),
          region: region.value,
          game_id: selectedAccount.value.game_id,
          access_key: accessKey.value,
        }),
      })

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({ error: `HTTP ${resp.status}` }))
        throw new Error(errorData.error || `HTTP ${resp.status}`)
      }

      const blob = await resp.blob()
      resultUrl.value = URL.createObjectURL(blob)
      resultMetaText.value = `QQ ${qqId.value.trim()} / 账号 ${selectedAccount.value.display_id}`
      showMessage('MSR 地图查询成功', 'success')
    } catch (e: any) {
      showMessage(`MSR 查询失败: ${e.message}`, 'error')
    } finally {
      rendering.value = false
    }
  }

  return {
    verified,
    accessKey,
    validating,
    region,
    qqId,
    querying,
    boundAccounts,
    selectedAccount,
    rendering,
    resultUrl,
    resultMetaText,
    message,
    queryResultMessage,
    queryResultType,
    canQuery,
    canRender,
    validateAccessKey,
    queryBinding,
    selectAccount,
    renderMsr,
    showMessage,
    hideMessage,
  }
}
