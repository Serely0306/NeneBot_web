import { useFrontendConfig } from './useFrontendConfig'

export function useUploadApi() {
  const config = useFrontendConfig()

  function buildApiUrl(path: string): string {
    return `${config.apiBaseUrl}/${String(path).replace(/^\/+/, '')}`
  }

  function buildUploadUrl(path: string): string {
    return `${config.uploadBaseUrl}/${String(path).replace(/^\/+/, '')}`
  }

  async function postJson(path: string, body: any): Promise<Response> {
    return fetch(buildApiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  function uploadFormData(path: string, formData: FormData): {
    xhr: XMLHttpRequest
    promise: Promise<any>
  } {
    const xhr = new XMLHttpRequest()
    const promise = new Promise<any>((resolve, reject) => {
      xhr.addEventListener('load', () => {
        try {
          const data = JSON.parse(xhr.responseText)
          resolve({ status: xhr.status, data })
        } catch {
          resolve({ status: xhr.status, data: { error: xhr.statusText } })
        }
      })
      xhr.addEventListener('error', () => reject(new Error('网络错误')))
    })
    xhr.open('POST', buildApiUrl(path))
    xhr.send(formData)
    return { xhr, promise }
  }

  return { buildApiUrl, buildUploadUrl, postJson, uploadFormData }
}
