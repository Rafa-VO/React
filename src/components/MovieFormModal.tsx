import { useState, useEffect } from "react";
import type { Pelicula } from "../types/pelicula";
import "./MovieFormModal.css"; 

interface MovieFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (peli: Partial<Pelicula>) => Promise<void>;
    peliInicial?: Pelicula | null;
}

export default function MovieFormModal({ isOpen, onClose, onSave, peliInicial }: MovieFormModalProps) {
    
    const [formData, setFormData] = useState<Partial<Pelicula>>({
        titulo: "", director: "", anio: 2026,poster: "", genero: "", sinopsis: ""
    });

    useEffect(() => {
        if (peliInicial) {
            setFormData(peliInicial);
        } else {
            setFormData({ titulo: "", director: "", anio: 2026,poster: "", genero: "", sinopsis: "" });
        }
    }, [peliInicial, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content form-modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2>{peliInicial ? "Editar Película" : "Nueva Película"}</h2>
                
                <form onSubmit={handleSubmit} className="movie-form">
                    <div className="form-group">
                        <label>Título</label>
                        <input name="titulo" value={formData.titulo} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Director</label>
                            <input name="director" value={formData.director} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Año</label>
                            <input type="number" name="anio" value={formData.anio} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Género</label>
                        <input name="genero" value={formData.genero} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>URL del Poster</label>
                        <input name="poster" value={formData.poster} onChange={handleChange} placeholder="https://..." />
                    </div>

                    <div className="form-group">
                        <label>Sinopsis</label>
                        <textarea name="sinopsis" value={formData.sinopsis} onChange={handleChange} rows={4} />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
                        <button type="submit" className="btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}