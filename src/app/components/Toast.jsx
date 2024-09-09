"use client";
import { useEffect, useState } from "react";
import styles from "./styles/Toast.module.css";

const Toast = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`${styles.toast} ${show ? styles.show : ""} ${styles[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
