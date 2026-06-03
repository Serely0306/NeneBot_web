import { ref } from 'vue'
import { useUploadApi } from './useUploadApi'

export function useSuiteUpload() {
  const { buildApiUrl } = useUploadApi()
  const region = ref('jp')
  const selectedFile = ref<File | null>(null)
  const uploading = ref(false)
  const progress = ref(0)
  const progressText = ref('准备上传...')
  const message = ref({ text: '', type: '' })

  function showMessage(text: string, type: string) {
    message.value = { text, type }
  }

  function hideMessage() {
    message.value = { text: '', type: '' }
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  function handleFile(file: File) {
    const knownExtensions = ['.json', '.bin', '.msgpack', '.dat']
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    const hasExt = file.name.includes('.')

    if (hasExt && !knownExtensions.includes(ext) && file.type !== 'application/octet-stream' && file.type !== '') {
      showMessage('不支持的文件格式，请上传 JSON 或二进制文件', 'error')
      return
    }
    if (file.size > 50 * 1024 * 1024) {
      showMessage('文件大小不能超过 50MB', 'error')
      return
    }
    selectedFile.value = file
    hideMessage()
  }

  function clearFile() {
    selectedFile.value = null
    hideMessage()
  }

  async function upload(): Promise<boolean> {
    if (!selectedFile.value) return false

    uploading.value = true
    progress.value = 0
    progressText.value = '正在上传...'
    hideMessage()

    const formData = new FormData()
    formData.append('file', selectedFile.value)
    formData.append('region', region.value)

    try {
      const xhr = new XMLHttpRequest()
      const result = await new Promise<{ status: number; data: any }>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            progress.value = Math.round((e.loaded / e.total) * 100)
            progressText.value = `上传中... ${progress.value}%`
          }
        })
        xhr.addEventListener('load', () => {
          try {
            resolve({ status: xhr.status, data: JSON.parse(xhr.responseText) })
          } catch {
            resolve({ status: xhr.status, data: { error: xhr.statusText } })
          }
        })
        xhr.addEventListener('error', () => reject(new Error('网络错误')))
        xhr.open('POST', buildApiUrl('upload/suite'))
        xhr.send(formData)
      })

      if (result.status === 200) {
        showMessage(`上传成功！数据已保存到 ${result.data.region_name}，用户ID: ${result.data.display_id}`, 'success')
        selectedFile.value = null
        return true
      } else {
        showMessage(`上传失败: ${result.data.error || '未知错误'}`, 'error')
        return false
      }
    } catch (e: any) {
      showMessage(`上传出错: ${e.message}`, 'error')
      return false
    } finally {
      uploading.value = false
    }
  }

  return {
    region,
    selectedFile,
    uploading,
    progress,
    progressText,
    message,
    formatFileSize,
    handleFile,
    clearFile,
    upload,
    showMessage,
    hideMessage,
  }
}
