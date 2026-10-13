const BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
export function getTokens() { return { access: localStorage.getItem('access'), refresh: localStorage.getItem('refresh') }; }
export function setTokens(data) { localStorage.setItem('access', data.access); if (data.refresh) localStorage.setItem('refresh', data.refresh); }
export function clearTokens() { localStorage.removeItem('access'); localStorage.removeItem('refresh'); }
export async function api(path, options = {}) {
  const { access } = getTokens();
  const headers = { 'Content-Type': 'application/json', ...(access ? { Authorization: `Bearer ${access}` } : {}), ...(options.headers || {}) };
  const response = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data.detail || Object.values(data).flat().join(' ') || `Request failed (${response.status})`;
    throw new Error(detail);
  }
  return data;
}
