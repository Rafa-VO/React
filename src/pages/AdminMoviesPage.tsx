import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";
import type { Pelicula } from "../types/pelicula";
import MovieList from "../components/MovieList";
import MovieFormModal from "../components/MovieFormModal";
import FilterBar from "../components/FilterBar";

import "./AdminMoviesPage.css";

export default function AdminMoviesPage() {
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [filtro, setFiltro] = useState("");
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [peliEditando, setPeliEditando] = useState<Pelicula | null>(null);

    useEffect(() => {
        cargarPeliculas();
    }, []);

    async function cargarPeliculas() {
        const data = await movieService.getAll();
        setPeliculas(data);
    }

    // Eliminar Pelicula
    async function handleDelete(id: number) {
        if (window.confirm("¿Seguro que quieres eliminar esta película del catálogo?")) {
            await movieService.delete(id);
            setPeliculas(prev => prev.filter(p => p.id !== id));
        }
    }

    // Se abre el modal para crear
    function openCreateModal() {
        setPeliEditando(null);
        setIsModalOpen(true);
    }

    // Se abre el modal para editar
    function openEditModal(peli: Pelicula) {
        setPeliEditando(peli);
        setIsModalOpen(true);
    }

    //Guardar cambios de crear o editar
    async function handleSave(datosForm: Partial<Pelicula>) {
        if (peliEditando) {
            const peliActualizada = { ...peliEditando, ...datosForm } as Pelicula;
            await movieService.update(peliActualizada);
        } else {
            await movieService.create(datosForm);
        }
        await cargarPeliculas();
        setIsModalOpen(false);
    }

    const peliculasFiltradas = peliculas.filter(p => 
        p.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <section className="admin-full-width">
            <div className="card admin-card-expanded">
                <div className="admin-header">
                    <div>
                        <h1>Gestión de Películas</h1>
                    </div>
                    <button className="btn-primary" onClick={openCreateModal}>
                        + Nueva Película
                    </button>
                </div>

                <FilterBar onSearch={setFiltro} />

                <MovieList 
                    peliculas={peliculasFiltradas} 
                    isAdmin={true} 
                    onDelete={handleDelete}
                    onEdit={openEditModal}
                />
            </div>

            <MovieFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                peliInicial={peliEditando}
            />
        </section>
    );
}