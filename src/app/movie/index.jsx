"use client";

import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import MovieList from "../components/MovieList";
import SearchFilter from "../components/SearchFilter";
import { useState } from "react";
import styles from "../components/styles/HomePage.module.css";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <>
      <Header />
      <BackgroundImage />
      <div className={styles.container}>
        <div className={styles.searchFilterWrapper}>
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>
        <div className={styles.movieListWrapper}>
          <MovieList
            estado="popular"
            title="Popular"
            searchTerm={searchTerm}
            selectedGenre={selectedGenre}
          />
          <MovieList
            estado="now_playing"
            title="Now Playing"
            searchTerm={searchTerm}
            selectedGenre={selectedGenre}
          />
          <MovieList
            estado="upcoming"
            title="Upcoming"
            searchTerm={searchTerm}
            selectedGenre={selectedGenre}
          />
          <MovieList
            estado="top_rated"
            title="Top Rated"
            searchTerm={searchTerm}
            selectedGenre={selectedGenre}
          />
          <MovieList
            estado="favorites"
            title="Favorites"
            searchTerm={searchTerm}
            selectedGenre={selectedGenre}
          />
        </div>
      </div>
    </>
  );
}
