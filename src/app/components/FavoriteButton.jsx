"use client";
import { AiFillHeart } from "react-icons/ai";
import styles from "./styles/FavoriteButton.module.css";

const FavoriteButton = ({ isFavorite, onClick, Favorites }) => (
  <div className={styles.container} onClick={onClick}>
    <h4 className={styles.label}>{Favorites}</h4>
    <AiFillHeart
      size={40}
      className={isFavorite ? styles.filled : styles.outline}
    />
  </div>
);

export default FavoriteButton;
