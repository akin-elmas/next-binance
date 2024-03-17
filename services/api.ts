import axios, { AxiosInstance } from "axios";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL || "";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
