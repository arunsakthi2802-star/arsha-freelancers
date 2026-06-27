import api from "./apiClient";

export const getReviews = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/reviews${qs ? `?${qs}` : ""}`);
};

export const submitReview = (formData) =>
  api.post("/reviews", formData, { isFormData: true });

export const updateReview = (id, formData) =>
  api.put(`/reviews/${id}`, formData, { isFormData: true });

export const deleteReview = (id) => api.delete(`/reviews/${id}`);

export const approveReview = (id) => api.post(`/reviews/${id}/approve`, {});

export const rejectReview = (id) => api.post(`/reviews/${id}/reject`, {});
