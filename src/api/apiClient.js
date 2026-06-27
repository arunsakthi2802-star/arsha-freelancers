// Axios client with JWT interceptor for Arsha API
const BASE_URL = "/api";

const request = async (method, endpoint, data = null, options = {}) => {
  const token = localStorage.getItem("arsha_token");
  const headers = {
    ...(options.isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = options.isFormData ? data : JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    // If 401 (token expired), clear auth and redirect
    if (response.status === 401) {
      localStorage.removeItem("arsha_token");
      localStorage.removeItem("arsha_user");
      window.dispatchEvent(new Event("arsha_auth_expired"));
    }
    throw new Error(json.message || `Request failed with status ${response.status}`);
  }

  return json;
};

export const api = {
  get: (endpoint, options) => request("GET", endpoint, null, options),
  post: (endpoint, data, options) => request("POST", endpoint, data, options),
  put: (endpoint, data, options) => request("PUT", endpoint, data, options),
  delete: (endpoint, options) => request("DELETE", endpoint, null, options),
};

export default api;
