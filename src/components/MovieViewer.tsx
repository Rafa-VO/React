import type { PeliculaUsuario } from "../types/pelicula";
import EstadoBadge from "./EstadoBadge";
import NoteForm from "./NoteForm";
import "./MovieViewer.css";

interface MovieViewerProps {
    pelicula: PeliculaUsuario | null;
    actualizarNota: (idUserMovie: number, nota: string) => void;
    cambiarEstado: (idUserMovie: number) => void;
    onRemove: (idUserMovie: number) => void;
}

function MovieViewer({ pelicula, actualizarNota, cambiarEstado, onRemove }: MovieViewerProps) {
    
    if (!pelicula) {
        return <div className="movie-viewer-empty">Selecciona una película para ver los detalles</div>;
    }

    function handleStatusClick() {
        if (pelicula) cambiarEstado(pelicula.userMovieId);
    }

    function handleRemoveClick() {
        if (pelicula) onRemove(pelicula.userMovieId);
    }

    function handleSaveNote(texto: string) {
        if (pelicula) actualizarNota(pelicula.userMovieId, texto);
    }

    return (
        <main className="movie-viewer">
            <div className="movie-viewer__header">
                <div>
                    <h2 className="movie-viewer__title">
                        {pelicula.titulo} <small className="movie-viewer__year">({pelicula.anio})</small>
                    </h2>
                    
                    <div onClick={handleStatusClick} className="movie-viewer__status">
                        <EstadoBadge 
                            visto={pelicula.visto} 
                            texto={pelicula.visto ? "Vista" : "Pendiente"} 
                        />
                    </div>
                </div>

                <button onClick={handleRemoveClick} className="btn-remove-movie">
                    Quitar de mi lista
                </button>
            </div>
            
            <div className="movie-viewer__content">
                <img src={pelicula.poster} alt={pelicula.titulo} />
                
                <div className="movie-viewer__details">
                    <p><strong>Director:</strong> {pelicula.director}</p>
                    <p><strong>Género:</strong> {pelicula.genero}</p>
                    
                    <hr className="movie-viewer__divider" />
                    
                    <NoteForm
                        key={pelicula.id}
                        notaActual={pelicula.notaPersonal}
                        guardarNota={handleSaveNote}
                    />
                </div>
            </div>
        </main>
    );
}

export default MovieViewer;