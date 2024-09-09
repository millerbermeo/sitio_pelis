"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import styles from "./styles/Header.module.css";
import ModalLogin from "./ModalLogin";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Logo"
            className={styles.logo}
            width={100}
            height={100}
          />
          <a href="/" className={styles.link}>
            Popular
          </a>
          <a href="/" className={styles.link}>
            Favoritos
          </a>
        </div>

        <div>
          <FaUserCircle
            className={styles.userIcon}
            onClick={openModal}
            style={{ color: isLoggedIn ? "yellow" : "white" }}
          />
        </div>
      </header>

      <ModalLogin isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Header;
