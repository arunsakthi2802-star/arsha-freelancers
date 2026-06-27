import api from "./apiClient";

export const getStories = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/stories${qs ? `?${qs}` : ""}`);
};

export const getAllStoriesAdmin = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/stories/admin/all${qs ? `?${qs}` : ""}`);
};

export const getStory = (id) => api.get(`/stories/${id}`);

export const createStory = (formData) =>
  api.post("/stories", formData, { isFormData: true });

export const updateStory = (id, formData) =>
  api.put(`/stories/${id}`, formData, { isFormData: true });

export const deleteStory = (id) => api.delete(`/stories/${id}`);

export const togglePublishStory = (id) => api.post(`/stories/${id}/publish`, {});
