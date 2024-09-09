import React from 'react';
import styles from './styles/NextButton.module.css';

const NextButton = ({ onClick }) => (
  <button className={styles.nextButton} onClick={onClick}>
    &#9654;
  </button>
);

export default NextButton;
