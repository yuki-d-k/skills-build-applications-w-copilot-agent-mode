const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function getCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchCollection(resource, signal) {
  const response = await fetch(getApiUrl(resource), { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  return getCollection(await response.json())
}
