import api from "./apiClient";

export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const register = (data) => api.post("/auth/register", data);

export const getMe = () => api.get("/auth/me");

export const logout = () => api.post("/auth/logout", {});

export const updateMyProfile = (data) => api.put("/users/profile", data);
