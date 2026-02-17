import type { Pelicula, PeliculaUsuario } from "../types/pelicula";
import EstadoBadge from "./EstadoBadge";
import "./MovieCard.css";

interface MovieCardProps {
    pelicula: Pelicula | PeliculaUsuario;
    seleccionarPelicula?: (id: number) => void;
    isAdmin?: boolean;
    onDelete?: (id: number) => void;
    onEdit?: (peli: Pelicula) => void;
    onRemoveFromList?: (userMovieId: number) => void;
    isAdded?: boolean;
}

export default function MovieCard({ pelicula, seleccionarPelicula, isAdmin, onDelete, onEdit, isAdded, onRemoveFromList }: MovieCardProps) {
    
    const esPeliUsuario = 'userMovieId' in pelicula;

    return (
        <div 
            className={`movie-card ${seleccionarPelicula ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => seleccionarPelicula && seleccionarPelicula(pelicula.id)}
        >
            <img src={pelicula.poster || "https://via.placeholder.com/150"} alt={pelicula.titulo} className="movie-card__img" />
            
            <div className="movie-card__info movie-card__info-flex">
                <h4>{pelicula.titulo}</h4>
                <p>{pelicula.anio} - {pelicula.director}</p>
                
                {esPeliUsuario && <EstadoBadge visto={(pelicula as PeliculaUsuario).visto} />}
                
                {!esPeliUsuario && (
                    <div className="status-wrapper">
                        {isAdded ? (
                            <span className="status-text status-added">
                                En tu lista
                            </span>
                        ) : (
                            <span className="status-text status-not-added">
                                No está en tu lista
                            </span>
                        )}
                    </div>
                )}

                {onRemoveFromList && esPeliUsuario && (
                    <button 
                        className="btn-remove-list"
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            onRemoveFromList((pelicula as PeliculaUsuario).userMovieId); 
                        }}
                    >
                        Quitar
                    </button>
                )}
            </div>

            {isAdmin && onEdit && onDelete && (
                <div className="movie-card__admin-actions">
                    <button className="btn-icon edit" onClick={(e) => { e.stopPropagation(); onEdit(pelicula as Pelicula); }}>Editar</button>
                    <button className="btn-icon delete" onClick={(e) => { e.stopPropagation(); onDelete(pelicula.id); }}>Eliminar</button>
                </div>
            )}
        </div>
    );
}