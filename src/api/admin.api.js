import api from "./apiClient";

export const getDashboardStats = () => api.get("/stats");

export const globalSearch = (q) => api.get(`/search?q=${encodeURIComponent(q)}`);

export const getUsers = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/users${qs ? `?${qs}` : ""}`);
};

export const updateUser = (id, formData) =>
  api.put(`/users/${id}`, formData, { isFormData: true });

export const deleteUser = (id) => api.delete(`/users/${id}`);

export const blockUser = (id) => api.post(`/users/${id}/block`, {});

export const resetUserPassword = (id, newPassword) =>
  api.post(`/users/${id}/reset-password`, { newPassword });

export const changeUserRole = (id, role, adminPassword) =>
  api.post(`/users/${id}/change-role`, { role, adminPassword });

export const createUser = (data) => api.post("/users", data);

export const uploadResourceFile = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api.post("/users/upload-resource", fd, { isFormData: true });
};
