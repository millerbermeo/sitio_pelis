import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/SearchFilter.module.css";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
}) => {
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=es",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWFhY2FlMjZiZGZhZjk4ZjkxOWQxMGU0NjExMGFjOSIsIm5iZiI6MTcyNTczMDY4OS4zMzkyNjgsInN1YiI6IjY2ZGM4ZTAxODEyYmY4MTgxMzM0Mjk3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RovZ9eebidgQdWuPN4Z2dZTAeW9oLDz21Figx2fztSU`,
          },
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error al obtener los géneros:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreSelect = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <label htmlFor="search" className={styles.searchLabel}>
          Search
        </label>
        <input
          type="text"
          id="search"
          placeholder="Keywords"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className={styles.genreDropdown}>
        <label htmlFor="genres" className={styles.genreLabel}>
          Géneros
        </label>
        <select
          id="genres"
          className={styles.genreSelect}
          value={selectedGenre}
          onChange={handleGenreSelect}
        >
          <option value="">Selecciona un género</option>
          {genres && genres.length > 0 ? (
            genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))
          ) : (
            <option disabled>Cargando géneros...</option>
          )}
        </select>
      </div>
    </div>
  );
};

SearchFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  setSelectedGenre: PropTypes.func.isRequired,
};

export default SearchFilter;
