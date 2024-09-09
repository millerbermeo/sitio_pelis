"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/navigation'
import ProgressCircle from "./ProgressCircle";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import FavoriteButton from "./FavoriteButton";
import styles from "./styles/MovieList.module.css";

const API_KEY = "11aacae26bdfaf98f919d10e46110ac9";
const BASE_URL = "https://api.themoviedb.org/3";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  prevArrow: <PrevButton />,
  nextArrow: <NextButton />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const MovieList = ({ estado, title, searchTerm, selectedGenre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const router = useRouter(); // Usa useRouter desde 'next/navigation'

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/movie/${estado}`, {
        params: {
          api_key: API_KEY,
          language: "es",
          page: 1,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      setError("Error al obtener las películas");
    } finally {
      setLoading(false);
    }
  }, [estado]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [movies, searchTerm]
  );

  const toggleFavorite = useCallback((movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId]
    );
  }, []);

  const handleCardClick = (id) => {
    router.push(`/movie/${id}`);
  };

  const renderMovieCard = (movie) => (
    <div key={movie.id} className={styles.cardWrapper} onClick={() => handleCardClick(movie.id)}>
      <div className={styles.card}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={searchTerm ? styles.cardImageSearch : styles.cardImage}
        />
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>
            {movie.title.split(" ").slice(0, 3).join(" ")}
            {movie.title.split(" ").length > 3 ? "..." : ""}
          </h2>
          <div className={styles.cardInfo}>
            <p className={styles.cardDate}>{movie.release_date}</p>
          </div>
        </div>
        <div className={styles.flexContainerOpt}>
          <div className={styles.ratingContainer}>
            <h4 className={styles.ratingText}>Rating</h4>
            <div className={styles.ratingCircle}>
              <ProgressCircle
                percentage={Math.round(movie.vote_average * 10)}
              />
            </div>
          </div>
          <FavoriteButton
            isFavorite={favorites.includes(movie.id)}
            onClick={() => toggleFavorite(movie.id)}
            Favorites="Favorites"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {!searchTerm && <h2 className={styles.title}>{title}</h2>}
      {loading && (
        <p className={`${styles.textCenter} ${styles.loading}`}>Cargando...</p>
      )}
      {searchTerm && filteredMovies.length > 0 && (
        <h2 className={styles.searchResultsTitle}>
          Resultados de la búsqueda por {title}
        </h2>
      )}
      {filteredMovies.length > 0 ? (
        searchTerm ? (
          <div className={styles.flexContainer}>
            {filteredMovies.map(renderMovieCard)}
          </div>
        ) : (
          <Slider {...sliderSettings}>{movies.map(renderMovieCard)}</Slider>
        )
      ) : (
        <p className={styles.textCenter}>No hay películas disponibles.</p>
      )}
    </div>
  );
};

export default MovieList;
