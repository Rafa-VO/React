import "./Header.css";

function Header() {
    return (
        <header className="app-header">
            <h1 className="app-header__logo">Cine Rafael</h1>
            <nav className="app-header__nav">
                <span>Mi Colección</span>
                <span>Perfil</span>
            </nav>
        </header>
    );
}

export default Header;