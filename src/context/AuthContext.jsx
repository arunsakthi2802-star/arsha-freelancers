import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin, getMe } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("arsha_token") || null);
  const [loading, setLoading] = useState(true);

  // Restore user from token on app load
  useEffect(() => {
    const restoreUser = async () => {
      const savedToken = localStorage.getItem("arsha_token");
      if (!savedToken) {
        setLoading(false);
        return;
      }
      try {
        const res = await getMe();
        if (res.success) {
          setUser(res.user);
          setToken(savedToken);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    restoreUser();

    // Listen for token expiry events from apiClient
    const onExpiry = () => clearAuth();
    window.addEventListener("arsha_auth_expired", onExpiry);
    return () => window.removeEventListener("arsha_auth_expired", onExpiry);
  }, []);

  const clearAuth = () => {
    localStorage.removeItem("arsha_token");
    localStorage.removeItem("arsha_user");
    setUser(null);
    setToken(null);
  };

  const login = useCallback(async (email, password) => {
    const res = await apiLogin(email, password);
    if (res.success) {
      localStorage.setItem("arsha_token", res.token);
      localStorage.setItem("arsha_user", JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const res = await getMe();
      if (res.success) {
        setUser(res.user);
        localStorage.setItem("arsha_user", JSON.stringify(res.user));
      }
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  }, []);

  const isAdmin = user?.role === "admin";
  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isAuthenticated, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
