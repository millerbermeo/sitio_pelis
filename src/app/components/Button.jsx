import styles from "./styles/ModalLogin.module.css";

const Button = ({ text, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${active ? styles.active : styles.inactive}`}
    >
      {text}
    </button>
  );
};

export default Button;
