import type { Pelicula } from "../types/pelicula";
import "./MovieModal.css"; // Crearemos este archivo ahora

interface MovieModalProps {
    pelicula: Pelicula | null;
    onClose: () => void;
    onAdd?: (id: number) => void;
    yaEnLista?: boolean;
}

export default function MovieModal({ pelicula, onClose, onAdd, yaEnLista }: MovieModalProps) {
    if (!pelicula) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="modal-body">
                    <img src={pelicula.poster} alt={pelicula.titulo} className="modal-img" />
                    
                    <div className="modal-info">
                        <h2>{pelicula.titulo} <small>({pelicula.anio})</small></h2>
                        <p className="modal-director">Director: {pelicula.director}</p>
                        <p className="modal-genero">Género: {pelicula.genero}</p>
                        
                        <div className="modal-sinopsis">
                            <h3>Sinopsis</h3>
                            <p>{pelicula.sinopsis}</p>
                        </div>

                        {onAdd && !yaEnLista && (
                            <button 
                                className="btn-add-modal"
                                onClick={() => { onAdd(pelicula.id); onClose(); }}
                            >
                                Añadir a mi lista
                            </button>
                        )}
                        {yaEnLista && <p className="modal-added-badge">Ya está en tu colección</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}