import { useState, useEffect } from "react";
import axios from "axios";

import { FaAnglesRight } from "react-icons/fa6";
import { restoredTheme } from "./themeUtils";

import styles from "./styles.module.css";

import Menu from "../../components/Menu/Menu";
import Statistics from "../../components/Statistics/Statistics";
import Card from "../../components/Card/Card";

const token = import.meta.env.VITE_PRIVATE_TOKEN;

export default function Home() {
    const [isLightTheme, setIsLigthTheme] = useState(true);
    const [dataMovies, setDataMovies] = useState({});
    const [myData, setMyData] = useState({})

    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();

    function toggleTheme() {
        const themeNow = !isLightTheme;
        setIsLigthTheme(themeNow);
        localStorage.setItem("@theme", themeNow ? "true" : "false");
    };

    async function restoreData() {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`,

                }
            }
            );

            if (response.data && response.data.results) {
                setDataMovies(response.data);
            } else {
                console.error("A resposta da API não contém 'results'.", response);
            }
        } catch (error) {
            console.error("Erro ao carregar DB", error);
        }
    }


    useEffect(() => {
        restoredTheme(setIsLigthTheme);
        restoreData();
    }, []);
    return (
        <div className={isLightTheme ? styles.ligthTheme : styles.darkTheme}>
            <Menu toggleTheme={toggleTheme} />
            <section className={styles.welcome}>
                <div className={styles.text}>
                    <h2 className={styles.slogan}>Aproveite cada segundo</h2>
                    <p className={styles.subtitle}>Conosco seus momentos se tornam mágicas</p>
                </div>

                <div className={styles.search}>
                    <input
                        type="search"
                        placeholder="Faça sua busca"
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </div>

            </section>
            {/* <div className={styles.cards}>
                {moviesFiltered.map(
                    (movie) => (
                        <Card key={movie.id} />
                    )
                )
                }
            </div> */}

            {/* <Footer isLightTheme={isLightTheme} /> */}

            <Statistics />

            <section className={styles.movies}>
                <h2 className={styles.typographySection}>Filmes</h2>
                <div className={styles.cards}>
                    {
                        dataMovies && dataMovies.results ? (
                            dataMovies.results.map((movie) => (
                                <Card key={movie.id} id={movie.id} title={movie.title} image={movie.poster_path} />
                            ))
                        ) : (
                            <p>Nenhum filme encontrado.</p>
                        )}
                </div>
            </section>

            <section className={styles.movies}>
                <h2 className={styles.typographySection}>Séries</h2>
                <div className={styles.cards}>
                    <Card />
                    <Card />
                </div>
            </section>

        </div>
    )
}