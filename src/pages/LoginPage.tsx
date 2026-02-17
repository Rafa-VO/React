import { useState } from "react";
import { useAuth } from "../auth/authContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import "./LoginPage.css";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        try {
            const session = await AuthService.login(email, password);
            
            const usuarioLogueado = login(session);

            if (usuarioLogueado.user.role === 'admin') {
                navigate("/admin", { replace: true });
            } else {
                navigate("/billboard", { replace: true });
            }

        } catch (e: any) {
            const msg = e.response?.data?.message || "Credenciales incorrectas";
            setError(msg);
        }
    }

    return (
        <section className="card">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-form-group">
                    <input 
                        className="login-input"
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        className="login-input"
                        type="password" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn-primary login-btn-submit">
                    Entrar
                </button>
            </form>
            
            {error && (
                <div className="login-error">
                    {error}
                </div>
            )}

            <p className="login-footer">
                ¿No tienes cuenta? <Link to="/register" className="login-link-register">Regístrate aquí</Link>
            </p>
        </section>
    );
}