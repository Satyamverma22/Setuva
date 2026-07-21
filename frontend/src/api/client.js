// Core API client for the Setu backend (FastAPI + MongoDB).
// Handles: base URL config, JWT attachment, automatic access-token refresh
// on 401, and consistent error shapes for the rest of the app to consume.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const TOKEN_KEY = 'setu_access_token';
const REFRESH_KEY = 'setu_refresh_token';

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens({ access_token, refresh_token }) {
  if (access_token) localStorage.setItem(TOKEN_KEY, access_token);
  if (refresh_token) localStorage.setItem(REFRESH_KEY, refresh_token);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// Custom error class so UI code can distinguish network failures from
// API-reported errors (which carry a real HTTP status + backend message).
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

let refreshInFlight = null;

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new ApiError('No refresh token available', 401);

  // De-duplicate concurrent refresh attempts (e.g. several requests firing
  // at once when the access token expires).
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
      .then(async (res) => {
        if (!res.ok) throw new ApiError('Session expired', res.status);
        const data = await res.json();
        setTokens(data);
        return data;
      })
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

/**
 * Low-level request helper.
 * @param {string} path - e.g. '/knowledge' (leading slash required)
 * @param {object} options - fetch options plus:
 *   - json: object to send as JSON body (sets Content-Type automatically)
 *   - auth: whether to attach the Authorization header (default true)
 *   - isFormData: pass a FormData body without JSON-encoding it
 */
export async function apiRequest(path, options = {}) {
  const { json, auth = true, isFormData = false, headers = {}, ...rest } = options;

  const doFetch = async () => {
    const finalHeaders = { ...headers };
    if (json !== undefined) finalHeaders['Content-Type'] = 'application/json';
    if (auth) {
      const token = getAccessToken();
      if (token) finalHeaders['Authorization'] = `Bearer ${token}`;
    }

    return fetch(`${BASE_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
      body: isFormData ? rest.body : json !== undefined ? JSON.stringify(json) : rest.body,
    });
  };

  let response = await doFetch();

  // On 401 with a stored refresh token, try one silent refresh + retry.
  if (response.status === 401 && auth && getRefreshToken()) {
    try {
      await refreshAccessToken();
      response = await doFetch();
    } catch {
      clearTokens();
      // Let the caller (AuthContext) know the session died so it can
      // reset UI state; a full reload is the simplest reliable reset here.
      window.dispatchEvent(new CustomEvent('setu:session-expired'));
      throw new ApiError('Session expired, please sign in again', 401);
    }
  }

  let data = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => null);
  }

  if (!response.ok) {
    let message = data?.detail || data?.message || `Request failed (${response.status})`;
    if (typeof message !== 'string') {
      if (Array.isArray(message)) {
        message = message.map(m => {
          const locStr = Array.isArray(m.loc) ? m.loc.slice(1).join('.') : '';
          return `${locStr ? locStr + ': ' : ''}${m.msg}`;
        }).join(', ');
      } else if (typeof message === 'object') {
        message = Object.entries(message)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
          .join(', ');
      } else {
        message = JSON.stringify(message);
      }
    }
    throw new ApiError(message, response.status, data);
  }

  return data;
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: 'GET' }),
  post: (path, json, options) => apiRequest(path, { ...options, method: 'POST', json }),
  put: (path, json, options) => apiRequest(path, { ...options, method: 'PUT', json }),
  delete: (path, options) => apiRequest(path, { ...options, method: 'DELETE' }),
  postForm: (path, formData, options) =>
    apiRequest(path, { ...options, method: 'POST', isFormData: true, body: formData }),
};

export { BASE_URL };
