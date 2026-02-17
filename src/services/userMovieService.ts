import axios from "axios";
import type { PeliculaUsuario } from "../types/pelicula";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const userMovieService = {
    getMyList: async (userId: number): Promise<PeliculaUsuario[]> => {
        const response = await axios.get(`${API_BASE}/user_movies?userId=${userId}&_expand=movie`);
        
        return response.data.map((item: any) => ({
            userMovieId: item.id,
            userId: item.userId,
            visto: item.visto,
            notaPersonal: item.notaPersonal || "",
            id: item.movie.id,
            titulo: item.movie.titulo,
            director: item.movie.director,
            anio: item.movie.anio,
            poster: item.movie.poster,
            genero: item.movie.genero
        }));
    },

    update: async (userMovieId: number, datos: { visto?: boolean, notaPersonal?: string }) => {
        return axios.patch(`${API_BASE}/user_movies/${userMovieId}`, datos);
    },

    add: async (userId: number, movieId: number) => {
        return axios.post(`${API_BASE}/user_movies`, {
            userId,
            movieId,
            visto: false,
            notaPersonal: ""
        });
    },

    remove: async (userMovieId: number) => {
        await axios.delete(`${API_BASE}/user_movies/${userMovieId}`);
    }
};