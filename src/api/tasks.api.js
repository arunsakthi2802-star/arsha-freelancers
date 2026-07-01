import api from "./apiClient";

export const getAllTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (data) => {
  try {
    const response = await api.post("/tasks", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id, data) => {
  try {
    const response = await api.put(`/tasks/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
