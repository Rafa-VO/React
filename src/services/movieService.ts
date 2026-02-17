import type { Pelicula } from '../types/pelicula';
import { http } from './http';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_URL = API_BASE_URL + "/movies";

export const movieService = {
    getAll: async (): Promise<Pelicula[]> => {
        const response = await http.get<Pelicula[]>(API_URL);
        return response.data;
    },
    get: async (id: number): Promise<Pelicula> => {
        const response = await http.get<Pelicula>(`${API_URL}/${id}`);
        return response.data;
    },
    create: async (pelicula: Partial<Pelicula>): Promise<Pelicula> => {
        const response = await http.post<Pelicula>(API_URL, pelicula);
        return response.data;
    },
    update: async (pelicula: Pelicula): Promise<Pelicula> => {
        const response = await http.patch<Pelicula>(`${API_URL}/${pelicula.id}`, pelicula);
        return response.data;
    },
    delete: async (id: number): Promise<void> => {
        await http.delete<void>(`${API_URL}/${id}`);
    }
};