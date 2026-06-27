import api from "./apiClient";

export const getServices = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/services${qs ? `?${qs}` : ""}`);
};

export const getAllServicesAdmin = () => api.get("/services/all");

export const createService = (data) => api.post("/services", data);

export const updateService = (id, data) => api.put(`/services/${id}`, data);

export const deleteService = (id) => api.delete(`/services/${id}`);

export const toggleService = (id) => api.post(`/services/${id}/toggle`, {});
