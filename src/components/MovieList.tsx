import type { Pelicula } from "../types/pelicula";
import MovieCard from "./MovieCard";

interface MovieListProps {
    peliculas: Pelicula[];
    seleccionarPelicula: (id: number) => void;
}

function MovieList({ peliculas, seleccionarPelicula }: MovieListProps) {
    return (
        <div className="movie-list">
            <h3>Mi Lista ({peliculas.length})</h3>
            {peliculas.map((peli) => (
                <MovieCard 
                    key={peli.id} 
                    pelicula={peli} 
                    seleccionarPelicula={seleccionarPelicula} 
                />
            ))}
        </div>
    );
}

export default MovieList;