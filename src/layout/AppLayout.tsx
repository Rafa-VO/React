import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout() {
    const location = useLocation();

    const isWelcomePage = location.pathname === "/";

    return (
        <div>
            {!isWelcomePage && <Header />}

            <main className="page">
                <Outlet />
            </main>
        </div>
    );
}