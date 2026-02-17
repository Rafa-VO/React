import { Link } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
    return (
        <div className="welcome-container">
            <div className="welcome-header">
                <h1 className="welcome-logo">Cine Rafael</h1>
            </div>
            
            <p className="welcome-text">
                Tu colección personal de películas.<br/>
                Organiza, puntúa y descubre tu próxima historia favorita.
            </p>

            <div className="welcome-actions">
                <Link to="/login" className="btn-welcome btn-primary">
                    Iniciar Sesión
                </Link>
                <Link to="/register" className="btn-welcome btn-secondary">
                    Registrarse
                </Link>
            </div>
        </div>
    );
}