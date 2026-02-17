import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import "./Header.css";

export default function Header() {
    const { isAuthenticated, logout, user } = useAuth();
    const location = useLocation();
    const isAdmin = user?.role === 'admin';
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    return (
        <header className="app-header">
            {isAuthenticated ? (
                <span className="app-header__brand brand-static">Cine Rafael</span>
            ) : (
                <Link to="/" className="app-header__brand">Cine Rafael</Link>
            )}

            <nav className="app-header__nav">
                {isAuthenticated && (
                    <>
                        {!isAdmin && (
                            <>
                                <NavLink to="/billboard">Cartelera</NavLink>
                                <NavLink to="/movies">Mi Lista</NavLink>
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-link-admin active" : "nav-link-admin"}>
                                    Gestionar Usuarios
                                </NavLink>

                                <NavLink to="/admin-movies" className={({isActive}) => isActive ? "nav-link-admin active" : "nav-link-admin"}>
                                    Gestionar Películas
                                </NavLink>
                            </>
                        )}

                        <span className="header-user-info">Hola, {user?.name}</span>
                        <button className="btn-logout" onClick={logout}>Salir</button>
                    </>
                )}

                {!isAuthenticated && !isAuthPage && (
                    <NavLink to="/login">Iniciar Sesión</NavLink>
                )}
            </nav>
        </header>
    );
}