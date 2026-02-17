import axios from "axios";
import type { User } from "../types/Auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const userService = {
    getAll: async () => {
        const response = await axios.get<User[]>(`${API_BASE}/users`);
        return response.data;
    },

    update: async (id: number, datos: Partial<User>) => {
        await axios.patch(`${API_BASE}/users/${id}`, datos);
    },

    getUserMovies: async (userId: number) => {
        const response = await axios.get(`${API_BASE}/user_movies?userId=${userId}&_expand=movie`);
        return response.data.map((item: any) => item.movie.titulo);
    }
};