import api from "./apiClient";

export const getGallery = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/gallery${qs ? `?${qs}` : ""}`);
};

export const uploadGalleryImage = (formData) =>
  api.post("/gallery", formData, { isFormData: true });

export const uploadGalleryBulk = (formData) =>
  api.post("/gallery/bulk", formData, { isFormData: true });

export const updateGalleryItem = (id, formData) =>
  api.put(`/gallery/${id}`, formData, { isFormData: true });

export const deleteGalleryItem = (id) => api.delete(`/gallery/${id}`);
