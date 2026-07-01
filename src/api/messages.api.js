import api from "./apiClient";

export const getAllMessages = async () => {
  try {
    const response = await api.get("/messages/all");
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (data) => {
  try {
    const response = await api.post("/messages", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const markMessageAsRead = async (id) => {
  try {
    const response = await api.put(`/messages/${id}/read`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteMessage = async (id) => {
  try {
    const response = await api.delete(`/messages/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
