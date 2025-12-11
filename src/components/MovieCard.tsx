import type { Pelicula } from "../types/pelicula";
import EstadoBadge from "./EstadoBadge";
import "./MovieCard.css";

interface MovieCardProps {
    pelicula: Pelicula;
    seleccionarPelicula: (id: number) => void; // Callback al padre
}

function MovieCard({ pelicula, seleccionarPelicula}: MovieCardProps) {
    return (
        <div className="movie-card" onClick={() => seleccionarPelicula(pelicula.id)}>
            <img src={pelicula.poster} alt={pelicula.titulo} className="movie-card__img" />
            <div className="movie-card__info">
                <h4>{pelicula.titulo}</h4>
                <p>{pelicula.anio}</p>
                <EstadoBadge visto={pelicula.visto} />
            </div>
        </div>
    );
}

export default MovieCard;