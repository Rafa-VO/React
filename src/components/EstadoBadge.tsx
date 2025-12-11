import "./EstadoBadge.css";

interface EstadoBadgeProps {
    visto: boolean;
    texto?: string;
}

function EstadoBadge({ visto, texto }: EstadoBadgeProps) {
    return (
        <span className={`estado-badge ${visto ? "estado-visto" : "estado-pendiente"}`}>
            {texto ? texto : (visto ? "Vista" : "Pendiente")}
        </span>
    );
}

export default EstadoBadge;