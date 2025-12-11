import type { Pelicula } from "../types/pelicula";
import EstadoBadge from "./EstadoBadge";
import NoteForm from "./NoteForm";
import "./MovieViewer.css";

interface MovieViewerProps {
    pelicula: Pelicula | null;
    actualizarNota: (id: number, nota: string) => void;
}

function MovieViewer({ pelicula, actualizarNota }: MovieViewerProps) {
    if (!pelicula) {
        return <div className="movie-viewer-empty">Selecciona una película para ver los detalles</div>;
    }

    return (
        <main className="movie-viewer">
            <div className="movie-viewer__header">
                <h2>{pelicula.titulo} <small>({pelicula.anio})</small></h2>
                <EstadoBadge visto={pelicula.visto} texto={pelicula.visto ? "YA VISTA" : "POR VER"} />
            </div>
            
            <div className="movie-viewer__content">
                <img src={pelicula.poster} alt={pelicula.titulo} />
                <div className="movie-viewer__details">
                    <p><strong>Director:</strong> {pelicula.director}</p>
                    <p><strong>Género:</strong> {pelicula.genero}</p>
                    
                    <hr />
                    
                    {/* Renderizamos el formulario pasándole la función de callback */}
                    <NoteForm 
                        key={pelicula.id} 
                        notaActual={pelicula.notaPersonal} 
                        guardarNota={(texto) => actualizarNota(pelicula.id, texto)}
                    />
                </div>
            </div>
        </main>
    );
}

export default MovieViewer;