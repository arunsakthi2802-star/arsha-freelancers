import api from "./apiClient";

export const getMyPayments = async () => {
  try {
    const response = await api.get("/payments/my-payments");
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllPayments = async () => {
  try {
    const response = await api.get("/payments/all");
    return response;
  } catch (error) {
    throw error;
  }
};

export const createPayment = async (data) => {
  try {
    const response = await api.post("/payments", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePayment = async (id, data) => {
  try {
    const response = await api.put(`/payments/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePayment = async (id) => {
  try {
    const response = await api.delete(`/payments/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
