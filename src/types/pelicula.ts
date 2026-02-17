export type Pelicula = {
    id: number;
    titulo: string;
    director: string;
    anio: number;
    poster: string;
    genero: string;
    sinopsis: string;
}

export type PeliculaUsuario = Pelicula & {
    userMovieId: number;
    userId: number;
    visto: boolean;
    notaPersonal: string;
}