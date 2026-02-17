import type { Pelicula, PeliculaUsuario } from "../types/pelicula";
import MovieCard from "./MovieCard";

interface MovieListProps {
    peliculas: (Pelicula | PeliculaUsuario)[];
    seleccionarPelicula?: (id: number) => void;
    onDelete?: (id: number) => void;
    onEdit?: (peli: Pelicula) => void;
    isAdmin?: boolean;
    misPeliculasIds?: number[]; 
    onRemoveFromList?: (userMovieId: number) => void;
}

export default function MovieList({ 
    peliculas, 
    seleccionarPelicula, 
    onDelete, 
    onEdit, 
    isAdmin, 
    misPeliculasIds,
    onRemoveFromList 
}: MovieListProps) {
    
    if (peliculas.length === 0) return <p style={{textAlign:'center', padding:'20px'}}>No hay películas.</p>;

    return (
        <div className="movie-list">
            {peliculas.map((peli) => {
                const yaLaTengo = misPeliculasIds?.includes(peli.id);

                return (
                    <MovieCard
                        key={isAdmin ? peli.id : (peli as PeliculaUsuario).userMovieId || peli.id}
                        pelicula={peli}
                        seleccionarPelicula={seleccionarPelicula}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        isAdmin={isAdmin}
                        isAdded={yaLaTengo}
                        onRemoveFromList={onRemoveFromList}
                    />
                );
            })}
        </div>
    );
}