const DEFAULT_API_BASE = 'https://159.75.213.84/api'
const DEFAULT_UPLOAD_BASE = 'https://159.75.213.84/upload'

let _config: { apiBaseUrl: string; uploadBaseUrl: string } | null = null

export function useFrontendConfig() {
  if (!_config) {
    const globalConfig = (typeof window !== 'undefined' ? (window as any).__NENE_UPLOAD_CONFIG__ : null) || {}
    _config = {
      apiBaseUrl: normalizeBaseUrl(globalConfig.apiBaseUrl || DEFAULT_API_BASE),
      uploadBaseUrl: normalizeBaseUrl(globalConfig.uploadBaseUrl || DEFAULT_UPLOAD_BASE),
    }
  }
  return _config
}

export function normalizeBaseUrl(value: string, fallback?: string): string {
  return String(value || fallback || '').trim().replace(/\/+$/, '')
}
