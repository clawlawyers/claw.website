import React from "react";
import { motion } from "framer-motion";
import styles from "./Result.module.css";
import { useNavigate } from "react-router-dom";

const resultAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Result = ({ score }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
    // window.location.href = "http://localhost:8000";
  };

  return (
    <motion.div
      className={styles.resultContainer}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={resultAnimation}
    >
      <h2>Your Score: {Math.min(Math.max(score, 10), 20)} out of 30</h2>
      <div className={styles.scrollContent}>
        <p>Here is some additional content after scrolling.</p>
      </div>
      <motion.button
        className={styles.backHomeButton}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBackToHome}
      >
        Go to Home Page
      </motion.button>
    </motion.div>
  );
};

export default Result;
