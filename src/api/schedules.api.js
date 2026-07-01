import api from "./apiClient";

export const createSchedule = (data) => api.post("/schedules", data);

export const getAllSchedules = () => api.get("/schedules");

export const getMySchedules = () => api.get("/schedules/my-schedules");

export const updateSchedule = (id, data) => api.put(`/schedules/${id}`, data);

export const deleteSchedule = (id) => api.delete(`/schedules/${id}`);
