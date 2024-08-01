// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // Update with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
