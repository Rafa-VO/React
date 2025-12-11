import { useState, type ChangeEvent } from "react";
import "./FilterBar.css";

interface FilterBarProps {
    filtrarPorTexto: (texto: string) => void;
}

function FilterBar({ filtrarPorTexto }: FilterBarProps) {
    const [busqueda, setBusqueda] = useState("");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const texto = e.target.value;
        setBusqueda(texto);
        filtrarPorTexto(texto); // Ejecuta la función del padre
    }

    return (
        <div className="filter-bar">
            <input 
                type="text" 
                placeholder="Buscar película..." 
                value={busqueda} 
                onChange={handleChange} 
                className="filter-bar__input"
            />
        </div>
    );
}

export default FilterBar;