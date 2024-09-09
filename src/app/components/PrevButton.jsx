import React from 'react';
import styles from './styles/PrevButton.module.css';

const PrevButton = ({ onClick }) => (
  <button className={styles.prevButton} onClick={onClick}>
    &#9664;
  </button>
);

export default PrevButton;
