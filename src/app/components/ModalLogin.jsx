"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles/ModalLogin.module.css";
import Button from "./Button";
import Toast from "./Toast";
import { CiCircleChevLeft } from "react-icons/ci";


const ModalLogin = ({ isOpen, closeModal }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // "success" o "error"

  const handleRegister = () => {
    setToastMessage(null);
    if (email && password) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      setToastMessage("User registered successfully!");
      setToastType("success");
      setIsSignUp(false);
    } else {
      setToastMessage("Please fill in all fields.");
      setToastType("error");
    }
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setToastMessage("");
      setToastType("success");
      setIsSignUp(true);
    }
  }, [isOpen]);

  const handleLogin = () => {
    setToastMessage(null);
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      sessionStorage.setItem("isLoggedIn", "true");
      setToastMessage("Logged in successfully!");
      setToastType("success");

      setTimeout(() => {
        closeModal();
      }, 1000);
    } else {
      setToastMessage("Invalid email or password.");
      setToastType("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <button className={styles.backButton} onClick={closeModal}>
        <CiCircleChevLeft />
          <span>Back</span>
        </button>
        <div className={styles.modalContent}>
          <div className={styles.formSection}>
            <div className={styles.actionButtons}>
              <Button
                text="Sign up"
                onClick={() => setIsSignUp(true)}
                active={isSignUp}
              />
              <Button
                text="Log In"
                onClick={() => setIsSignUp(false)}
                active={!isSignUp}
              />
            </div>

            {isSignUp ? (
              <div className={styles.registerSection}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
                <Button
                  text="Register with your Email"
                  onClick={handleRegister}
                />
              </div>
            ) : (
              <div className={styles.loginSection}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
                <Button text="Log In" onClick={handleLogin} />
              </div>
            )}

            <p className={styles.contactInfo}>
              For any questions, reach out to support@quickbetmovies.com
            </p>
          </div>

          <div className={styles.welcomeSection}>
            <h1>
              {isSignUp ? (
                <>
                  Welcome to Quickbet <br /> Movies!
                </>
              ) : (
                <>
                  Welcome back to <br /> Quickbet Movies!
                </>
              )}
            </h1>

            <p>
              {isSignUp
                ? "Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!"
                : "Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!"}
            </p>
            <img
              src={isSignUp ? "fondologin1.png" : "fondologin2.png"}
              alt="Avatar"
              className={styles.avatar}
            />
          </div>
        </div>
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default ModalLogin;
