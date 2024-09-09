"use client";

import Image from "next/image";
import styles from "./styles/MovieDetails.module.css";
import Header from "./Header";
import FavoriteButton from "./FavoriteButton";
import ProgressCircle from "./ProgressCircle";

const MovieDetails = ({
  movie,
  recommendations,
  isFavorite,
  toggleFavorite,
  favoritesCount,
}) => {
  if (!movie) {
    return (
      <>
        <Header />
        <div className={styles.recommendations}>
          <h2>Recommendations</h2>
          <div className={styles.recommendationList}>
            {recommendations.slice(0, 6).map((rec) => (
              <div key={rec.id} className={styles.recommendationItem}>
                <Image
                  src={rec.posterUrl}
                  alt={rec.title}
                  width={200}
                  height={300}
                  className={styles.recommendationPoster}
                />
                <p>{rec.title}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  const backgroundStyle = {
    backgroundImage: `url(${movie.backdropUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <Header />
      <div className={styles.movieSection} style={backgroundStyle}>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <div className={styles.movieInfo}>
              <div className={styles.poster}>
                <Image
                  src={movie.posterUrl}
                  alt={`${movie.title} Poster`}
                  width={290}
                  height={390}
                  className={styles.posterImage}
                />
                <button className={styles.trailerButton}>
                  Official Trailer
                </button>
              </div>
              <div className={styles.details}>
                <div>
                  <h2 className={styles.title}>
                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                  </h2>
                </div>
                <div className={styles.contentSection}>
                  <p className={styles.releaseDate}>{movie.release_date}</p>
                  <h2 className={styles.runtime}>{movie.runtime} min</h2>
                </div>
                <p className={styles.overview}>Overview</p>
                <p className={styles.overview}>{movie.overview}</p>

                <div className={styles.ratingAndFavorite}>
                  <div className={styles.progress}>
                    <ProgressCircle
                      percentage={Math.round(movie.vote_average * 10)}
                    />
                    <span>
                      Users <br /> Score
                    </span>
                  </div>
                  <FavoriteButton
                    isFavorite={isFavorite}
                    onClick={toggleFavorite}
                    Favorites={favoritesCount}
                  />
                </div>

                <div className={styles.genres}>
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className={styles.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.recommendations}>
        <h2>Recommendations</h2>
        <div className={styles.recommendationList}>
          {recommendations.slice(0, 6).map((rec) => (
            <div key={rec.id} className={styles.recommendationItem}>
              <Image
                src={rec.posterUrl}
                alt={rec.title}
                width={200}
                height={300}
                className={styles.recommendationPoster}
              />
              <p>{rec.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
