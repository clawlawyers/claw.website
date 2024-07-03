import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./Result.module.css";
import ReactSpeedometer from "react-d3-speedometer";

const resultAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
};

const buttonAnimation = {
  whileHover: { scale: 1.1, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" },
  whileTap: { scale: 0.9 },
};

const Result = ({ score }) => {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const minScore = Math.min(Math.max(score, 10), 20);

  const handleBackToHome = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/");
    }, 500); // Match this duration with the exit animation duration
  };

  return (
    <motion.div
      className={styles.resultContainer}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={resultAnimation}
      onAnimationComplete={() => isExiting && navigate("/")}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
      >
        Your Score: {minScore} out of 30
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
      >
        <ReactSpeedometer
          value={minScore}
          maxValue={30}
          needleColor="steelblue"
          needleTransitionDuration={4000}
          needleTransition="easeElastic"
          textColor="black"
          startColor="green"
          segments={10}
          endColor="blue"
          className={styles.speedometer}
        />
      </motion.div>
      <div className={styles.scrollContent}>
        <p>Here is some additional content after scrolling.</p>
      </div>
      <motion.button
        className={styles.backHomeButton}
        variants={buttonAnimation}
        whileHover="whileHover"
        whileTap="whileTap"
        onClick={handleBackToHome}
      >
        Go to Home Page
      </motion.button>
    </motion.div>
  );
};

export default Result;
