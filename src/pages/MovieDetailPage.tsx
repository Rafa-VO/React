import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { movieService } from "../services/movieService";
import type { Pelicula } from "../types/pelicula";

export default function MovieDetailPage() {
    const { id } = useParams();
    const [peli, setPeli] = useState<Pelicula | null>(null);

    useEffect(() => {
        if(id) movieService.get(Number(id)).then(setPeli).catch(() => setPeli(null));
    }, [id]);

    if (!peli) return <p className="card">Cargando...</p>;

    return (
        <section className="task-hero">
            <h1 className="task-hero-title">{peli.titulo}</h1>
            <p><strong>Director:</strong> {peli.director}</p>
            <p><strong>Género:</strong> {peli.genero}</p>
            <div className="task-hero-actions" style={{marginTop: '20px'}}>
                <Link to="/movies" className="btn">Volver</Link>
            </div>
        </section>
    );
}