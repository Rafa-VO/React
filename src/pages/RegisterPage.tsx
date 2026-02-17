import { useState } from "react";
import { useAuth } from "../auth/authContext";
import { Link, Navigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import "./RegisterPage.css";

export default function RegisterPage() {
    const { isAuthenticated } = useAuth();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [exito, setExito] = useState(false);

    if (isAuthenticated) return <Navigate to="/billboard" replace />

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        try {
            await AuthService.register(email, password, nombre);
            setExito(true);
        } catch (e: any) {
            setError(e.response?.data?.message || "Error al registrarse");
        }
    }

    if (exito) {
        return (
            <section className="card register-success">
                <h1>¡Registro Completado!</h1>
                <p>Tu cuenta ha sido creada.</p>
                <Link to="/login" className="btn-cine btn-return">Ir a Iniciar Sesión</Link>
            </section>
        )
    }

    return (
        <section className="card">
            <h1 className="register-title">Crear Cuenta</h1>
            <form onSubmit={handleSubmit}>
                <div className="register-inputs">
                    <input className="input-cine" type="text" placeholder="Tu Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    <input className="input-cine" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="input-cine" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn-cine">Registrarme</button>
            </form>

            {error && <div className="register-error">{error}</div>}

            <p className="register-footer">
                ¿Ya tienes cuenta? <Link to="/login" className="link-login">Inicia sesión</Link>
            </p>
        </section>
    );
}