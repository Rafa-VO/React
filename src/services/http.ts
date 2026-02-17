import axios from "axios";
import { authStorage } from "../auth/authStorage";
import type { AuthSession } from "../types/Auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

http.interceptors.request.use((config) => {
    const session: AuthSession | null = authStorage.get();
    
    if (session?.token) {
        // Aseguramos que headers existe
        config.headers = config.headers || {};
        // Inyectamos el token
        config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el token ha caducado o es falso (401)
        if (error.response && error.response.status === 401) {
            authStorage.clear();
            window.location.assign("/login");
        }
        return Promise.reject(error);
    }
);