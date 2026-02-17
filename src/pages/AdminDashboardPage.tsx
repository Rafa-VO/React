import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import type { User } from "../types/Auth";
import { useAuth } from "../auth/authContext";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
    const { user: currentUser } = useAuth();
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [listaVisible, setListaVisible] = useState<{name: string, movies: string[]} | null>(null);

    useEffect(() => { cargarUsuarios(); }, []);

    async function cargarUsuarios() {
        const data = await userService.getAll();
        setUsuarios(data);
    }

    async function toggleRole(u: User) {
        if (u.id === currentUser?.id) return alert("¡No puedes cambiarte el rol a ti mismo!");
        const nuevoRol = u.role === "admin" ? "user" : "admin";
        if (window.confirm(`¿Cambiar rol de ${u.name} a ${nuevoRol.toUpperCase()}?`)) {
            await userService.update(u.id, { role: nuevoRol });
            cargarUsuarios();
        }
    }

    async function toggleBan(u: User) {
        if (u.id === currentUser?.id) return alert("¡No puedes banearte a ti mismo!");
        const nuevoEstado = !u.banned; 
        const accion = nuevoEstado ? "BANEAR" : "DESBANEAR"; 
        if (window.confirm(`¿Seguro que quieres ${accion} a ${u.name}?`)) {
            await userService.update(u.id, { banned: nuevoEstado });
            cargarUsuarios();
        }
    }

    async function verPeliculas(targetUser: User) {
        const titulos = await userService.getUserMovies(targetUser.id);
        if (titulos.length === 0) {
            alert(`${targetUser.name} no tiene películas en su lista.`);
        } else {
            setListaVisible({ name: targetUser.name, movies: titulos });
        }
    }

    return (
        <div className="app-container">
            <div className="card admin-card">
                <h1>Panel de Administración</h1>
                <p className="admin-description">Control total sobre usuarios y permisos.</p>

                <table className="admin-table">
                    <thead>
                        <tr className="admin-table-head">
                            <th className="admin-th">Usuario</th>
                            <th className="admin-th">Rol</th>
                            <th className="admin-th">Estado</th>
                            <th className="admin-th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(u => (
                            <tr key={u.id} className="admin-tr">
                                <td className="admin-td">
                                    <strong>{u.name}</strong><br />
                                    <small className="admin-email">{u.email}</small>
                                </td>
                                <td className="admin-td">
                                    <span className={`role-badge ${u.role === 'admin' ? 'role-admin' : 'role-user'}`}>
                                        {u.role.toUpperCase()}
                                    </span>
                                </td>
                                <td className="admin-td">
                                    {u.banned ? <span className="status-banned">BANEADO</span> : <span className="status-active">Activo</span>}
                                </td>
                                <td className="actions-cell">
                                    <button onClick={() => verPeliculas(u)} className="btn-action btn-blue">
                                        Lista
                                    </button>

                                    <button onClick={() => toggleRole(u)} className="btn-action btn-orange">
                                        {u.role === 'admin' ? '⬇User' : '⬆Admin'}
                                    </button>

                                    <button 
                                        onClick={() => toggleBan(u)} 
                                        className={`btn-action ${u.banned ? 'btn-ban-green' : 'btn-ban-red'}`}
                                    >
                                        {u.banned ? 'Desbanear' : 'Banear'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {listaVisible && (
                <div className="admin-modal-overlay" onClick={() => setListaVisible(null)}>
                    <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
                        <h3 className="admin-modal-title">Lista de {listaVisible.name}</h3>
                        {listaVisible.movies.length > 0 ? (
                            <ul className="admin-modal-ul">
                                {listaVisible.movies.map((titulo, index) => <li key={index} className="admin-modal-li">{titulo}</li>)}
                            </ul>
                        ) : <p className="admin-modal-empty">Lista vacía</p>}
                        <button onClick={() => setListaVisible(null)} className="btn-close">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}