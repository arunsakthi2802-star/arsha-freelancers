import api from "./apiClient";

export const getMyProjects = async () => {
  try {
    const response = await api.get("/projects/my-projects");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await api.get("/projects/all");
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id, data) => {
  try {
    const response = await api.put(`/projects/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const createProject = async (data) => {
  try {
    const response = await api.post(`/projects`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
