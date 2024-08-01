// src/api/auth.ts
import api from "./axiox";

export const login = async (username: string, password: string) => {
  const response = await api.post("/login/", { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post("/register/", { username, password });
  return response.data;
};
