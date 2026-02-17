import { useEffect, useState } from "react";
import { useAuth } from "../auth/authContext";
import { userMovieService } from "../services/userMovieService";
import type { PeliculaUsuario } from "../types/pelicula";
import MovieList from "../components/MovieList";
import MovieViewer from "../components/MovieViewer";
import FilterBar from "../components/FilterBar";

export default function MyCollectionPage() {
    const { user } = useAuth();
    const [peliculas, setPeliculas] = useState<PeliculaUsuario[]>([]);
    const [idSeleccionado, setIdSeleccionado] = useState<number | null>(null);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        if (user) cargarMisPeliculas();
    }, [user]);

    function cargarMisPeliculas() {
        if (!user) return;
        userMovieService.getMyList(user.id).then(setPeliculas);
    }

    function handleUpdateNota(userMovieId: number, nota: string) {
        userMovieService.update(userMovieId, { notaPersonal: nota }).then(() => {
            cargarMisPeliculas();
        });
    }

    function handleToggleVisto(userMovieId: number) {
        const peli = peliculas.find(p => p.userMovieId === userMovieId);
        if (peli) {
            userMovieService.update(userMovieId, { visto: !peli.visto }).then(() => {
                cargarMisPeliculas();
            });
        }
    }

    async function handleRemove(userMovieId: number) {
        if (!window.confirm("¿Seguro que quieres quitar esta película de tu lista?")) return;

        try {
            await userMovieService.remove(userMovieId);
            
            setPeliculas(prev => prev.filter(p => p.userMovieId !== userMovieId));

            const peliBorrada = peliculas.find(p => p.userMovieId === userMovieId);
            if (peliBorrada && peliBorrada.id === idSeleccionado) {
                setIdSeleccionado(null);
            }
        } catch (error) {
            console.error("Error al quitar la película:", error);
            alert("No se pudo quitar la película de la lista.");
        }
    }

    const peliculasFiltradas = peliculas.filter(p =>
        p.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    const peliculaActiva = peliculas.find(p => p.id === idSeleccionado) || null;

    return (
        <div className="app-container">
            <div className="app-content">
                
                <aside className="app-sidebar">
                    <FilterBar onSearch={setFiltro} />
                    
                    <MovieList 
                        peliculas={peliculasFiltradas} 
                        seleccionarPelicula={setIdSeleccionado}
                    />
                </aside>

                <section className="app-main">
                    <MovieViewer 
                        pelicula={peliculaActiva} 
                        actualizarNota={handleUpdateNota}
                        cambiarEstado={handleToggleVisto}
                        onRemove={handleRemove}
                    />
                </section>
            </div>
        </div>
    );
}