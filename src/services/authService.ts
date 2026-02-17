import axios, { isAxiosError } from "axios";
import type { AuthResponse } from "../types/Auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const AuthService = {
    login(email:string, password:string) {
        return axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, {email, password} ).then( (r) => r.data);
    },

    register(email:string, password:string, name: string) {
        return axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, {email, password, name} ).then( (r) => r.data);
    },

    isAuthError: isAxiosError
}