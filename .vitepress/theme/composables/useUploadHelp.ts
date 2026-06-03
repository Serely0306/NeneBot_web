import { ref } from 'vue'
import { useUploadApi } from './useUploadApi'

export function useUploadHelp() {
  const { buildUploadUrl } = useUploadApi()
  const activeTab = ref('ios-module')
  const message = ref({ text: '', type: '' })
  const androidGuideContent = ref('点击当前标签后将自动加载 Android 使用方式...')
  const androidGuideLoaded = ref(false)

  function showMessage(text: string, type: string) {
    message.value = { text, type }
  }

  function hideMessage() {
    message.value = { text: '', type: '' }
  }

  async function fetchText(path: string): Promise<string> {
    const resp = await fetch(path)
    const text = await resp.text()
    if (!resp.ok) throw new Error(text || `HTTP ${resp.status}`)
    return text
  }

  async function ensureAndroidGuideLoaded() {
    if (androidGuideLoaded.value) return
    androidGuideContent.value = 'Android 使用方式加载中...'
    try {
      androidGuideContent.value = await fetchText(buildUploadUrl('help/android'))
      androidGuideLoaded.value = true
    } catch (e: any) {
      androidGuideContent.value = 'Android 使用方式加载失败，请稍后重试。'
      showMessage(`加载 Android 使用方式失败：${e.message}`, 'error')
    }
  }

  async function activateTab(tabName: string) {
    hideMessage()
    activeTab.value = tabName
    if (tabName === 'android-guide') await ensureAndroidGuideLoaded()
    window.location.hash = tabName
  }

  async function copyIosModule() {
    try {
      const content = await fetchText(iosModuleUrl)
      await navigator.clipboard.writeText(content)
      showMessage('模块内容已复制到剪贴板。', 'success')
    } catch (e: any) {
      showMessage(`复制失败：${e.message}`, 'error')
    }
  }

  async function downloadIosModule() {
    try {
      const content = await fetchText(iosModuleUrl)
      const blob = new Blob([content], { type: 'application/octet-stream' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'nene_upload.sgmodule'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e: any) {
      showMessage(`下载失败：${e.message}`, 'error')
    }
  }

  async function copyScript(url: string, name: string) {
    try {
      const content = await fetchText(url)
      await navigator.clipboard.writeText(content)
      showMessage(`${name} 内容已复制到剪贴板。`, 'success')
    } catch (e: any) {
      showMessage(`复制失败：${e.message}`, 'error')
    }
  }

  async function downloadScript(url: string, filename: string) {
    try {
      const content = await fetchText(url)
      const blob = new Blob([content], { type: 'application/octet-stream' })
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch (e: any) {
      showMessage(`下载失败：${e.message}`, 'error')
    }
  }

  const iosModuleUrl = buildUploadUrl('help/ios')
  const catcherDownloadUrl = buildUploadUrl('download/catcher.sh')
  const killCatcherUrl = buildUploadUrl('download/kill-catcher.sh')
  const uninstallCatcherUrl = buildUploadUrl('download/uninstall-catcher.sh')

  return {
    activeTab,
    message,
    androidGuideContent,
    iosModuleUrl,
    catcherDownloadUrl,
    killCatcherUrl,
    uninstallCatcherUrl,
    activateTab,
    copyIosModule,
    downloadIosModule,
    downloadScript,
    copyScript,
  }
}
