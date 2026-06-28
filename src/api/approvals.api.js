import api from "./axios";

export const getApprovalRequests = async () => {
  const response = await api.get("/approvals");
  return response.data;
};

export const decideApproval = async (id, status, adminComment = "") => {
  const response = await api.put(`/approvals/${id}/decide`, { status, adminComment });
  return response.data;
};

export const getAuditLogs = async () => {
  const response = await api.get("/approvals/audit-logs");
  return response.data;
};
