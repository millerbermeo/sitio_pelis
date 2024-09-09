"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/BackgroundImage.module.css";
import ProgressCircle from "./ProgressCircle";
import FavoriteButton from "./FavoriteButton";

const API_KEY = "11aacae26bdfaf98f919d10e46110ac9";
const BASE_URL = "https://api.themoviedb.org/3";

const BackgroundImage = ({ movieId = "533535" }) => {
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: "es",
        },
      });
      setMovie(response.data);
    } catch (error) {
      console.error("Error al obtener los detalles de la película:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: movie
          ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
          : "none",
      }}
    >
      <div className={styles.overlay}>
        <div className={styles.contentText}>
          <h1 className={styles.title}>
            {movie ? movie.title : "Cargando..."}
          </h1>
          <p className={styles.description}>{movie ? movie.overview : ""}</p>
        </div>
        <div className={styles.content}>
          <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
          {movie && (
            <div className={styles.ratingContainer}>
              <ProgressCircle percentage={movie.vote_average * 10} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
