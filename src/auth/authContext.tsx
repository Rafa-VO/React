import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthSession, User } from "../types/Auth";
import { authStorage } from "./authStorage";

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    login: (session: AuthSession) => AuthSession;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const initial = authStorage.get();
    
    const [user, setUser] = useState<User | null>(initial?.user ?? null);
    const [token, setToken] = useState<string | null>(initial?.token ?? null);

    function syncFromStorage() {
        const session = authStorage.get();
        setUser(session?.user ?? null);
        setToken(session?.token ?? null);
    }

    function login(session: AuthSession) {
        authStorage.set(session);
        setUser(session.user);
        setToken(session.token);
        return session;
    }

    function logout() {
        authStorage.clear();
        setUser(null);
        setToken(null);
    }

    useEffect(() => {
        window.addEventListener("storage", syncFromStorage);
        return () => window.removeEventListener("storage", syncFromStorage);
    }, []);

    const value = useMemo(() => ({
        user,
        isAuthenticated: Boolean(user),
        login,
        logout
    }), [user, token]); 

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de <AuthProvider />");
    }
    return context;
}