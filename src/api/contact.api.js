import api from "./apiClient";

export const submitContact = (data) => api.post("/contact", data);

export const getContacts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/contact${qs ? `?${qs}` : ""}`);
};

export const updateContactStatus = (id, status) =>
  api.put(`/contact/${id}`, { status });

export const deleteContact = (id) => api.delete(`/contact/${id}`);
