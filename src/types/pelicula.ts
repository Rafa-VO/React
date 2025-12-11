export type Pelicula = {
    id: number;
    titulo: string;
    director: string;
    anio: number;
    poster: string;
    genero: string;
    visto: boolean;
    notaPersonal?: string; // Opcional
}