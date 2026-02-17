export type User = {
    id: number;
    email: string;
    name: string;
    role: "admin" | "user";
    banned?: boolean;
}

export type AuthSession = {
    token: string;
    user: User;
}

export type AuthResponse = AuthSession;