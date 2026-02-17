import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";
import { userMovieService } from "../services/userMovieService";
import { useAuth } from "../auth/authContext";
import type { Pelicula } from "../types/pelicula";
import MovieList from "../components/MovieList";
import FilterBar from "../components/FilterBar";
import MovieModal from "../components/MovieModal"; 
import "./BillboardPage.css";

export default function BillboardPage() {
    const { user } = useAuth();
    const [todasPeliculas, setTodasPeliculas] = useState<Pelicula[]>([]);
    const [misPeliculasIds, setMisPeliculasIds] = useState<number[]>([]);
    const [filtro, setFiltro] = useState("");
    const [peliParaModal, setPeliParaModal] = useState<Pelicula | null>(null);

    useEffect(() => {
        if (user) cargarDatos();
    }, [user]);

    async function cargarDatos() {
        if (!user) return;
        try {
            const todas = await movieService.getAll();
            setTodasPeliculas(todas);

            const misPelis = await userMovieService.getMyList(user.id);
            const misIds = misPelis.map(p => p.id);
            setMisPeliculasIds(misIds);
        } catch (error) {
            console.error("Error cargando cartelera:", error);
        }
    }

    async function handleAdd(movieId: number) {
        if (!user) return;
        try {
            await userMovieService.add(user.id, movieId);
            setMisPeliculasIds([...misPeliculasIds, movieId]);
        } catch (error) {
            console.error("Error al añadir", error);
        }
    }

    const peliculasFiltradas = todasPeliculas.filter(p => 
        p.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <section className="app-container">
            <div className="card billboard-card">
                <div className="billboard-header">
                    <h1 className="billboard-title">Cartelera General</h1>
                    <p className="billboard-subtitle">
                        Haz clic en una película para ver su sinopsis y añadirla a tu lista.
                    </p>
                </div>
                
                <FilterBar onSearch={setFiltro} />
                
                <MovieList 
                    peliculas={peliculasFiltradas}
                    misPeliculasIds={misPeliculasIds}
                    seleccionarPelicula={(id) => {
                        const peli = todasPeliculas.find(p => p.id === id);
                        if (peli) setPeliParaModal(peli);
                    }}
                />
            </div>

            <MovieModal 
                pelicula={peliParaModal} 
                onClose={() => setPeliParaModal(null)} 
                onAdd={handleAdd}
                yaEnLista={misPeliculasIds.includes(peliParaModal?.id || 0)}
            />
        </section>
    );
}