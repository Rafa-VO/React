import "./FilterBar.css";

interface FilterBarProps {
    onSearch: (texto: string) => void;
}

export default function FilterBar({ onSearch }: FilterBarProps) {
    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Buscar película..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}