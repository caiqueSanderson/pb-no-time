import { useState } from "react";
import { Link } from "react-router-dom";

import { FaHouse, FaFilm, FaMoon } from "react-icons/fa6";

import styles from "./styles.module.css";

export default function Menu(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <span>MoviMe</span>
            </div>

            <nav className={`${styles.menu} ${isMenuOpen ? styles.show : ""}`}>
                <Link to="/" className={styles.menuItem}>
                    <span className={styles.icons}><FaHouse /></span>
                    <span>Início</span>
                </Link>
                
                <Link to="/my-movies" className={styles.menuItem}>
                    <span className={styles.icons}><FaFilm /></span>
                    <span>Estatísticas</span>
                </Link>

                <span className={styles.menuItem} onClick={props.toggleTheme}>
                    <FaMoon />
                </span>
            </nav>

            <div className={styles.menuToggle} onClick={toggleMenu}>
                ☰
            </div>
        </header>
    );
}
