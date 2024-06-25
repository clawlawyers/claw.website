import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Quiz.module.css";

const questions = [
  {
    question: "1. Ever Thought of Skipping Rent?",
    options: [
      {
        text: "Convince your landlord to accept rent in the form of home-cooked meals",
        score: 1,
      },
      { text: "Claim that your dog ate your money", score: 2 },
      {
        text: "Offer to make your landlord into an online sensation",
        score: 3,
      },
    ],
  },
  {
    question: "2. Tax Season Got You Down?",
    options: [
      {
        text: "Categorizing Your Netflix Subscription as 'Research'",
        score: 1,
      },
      {
        text: "Send your tax return via carrier pigeon and claim 'technological resistance' as grounds for an extension",
        score: 2,
      },
    ],
  },
  {
    question: "3. Ready to Ditch Your Job?",
    options: [
      { text: "Documenting Your Boss’s Blunders", score: 1 },
      { text: "Giving the Notice in the form of a breakup letter", score: 2 },
      { text: "Recreate every prank from 'The Office'", score: 3 },
    ],
  },
  {
    question: "4. Got an Unreliable Roommate?",
    options: [
      {
        text: "Leaving a trail of snacks out the door and into a neighbor’s house?",
        score: 1,
      },
      {
        text: "Invite all your extended family over for an 'indefinite stay' and ensure there’s always a lively game of antakshari",
        score: 2,
      },
      {
        text: "Set all their alarms to random times throughout the night",
        score: 3,
      },
    ],
  },
  {
    question: "5. Want to change your identity? This question is required.",
    options: [
      { text: "Consider becoming an international spy", score: 1 },
      {
        text: "Live alone in the mountains unnamed and come back after 30 years",
        score: 2,
      },
      {
        text: "Get your friend to pose as a fake lawyer to buy you some time",
        score: 3,
      },
    ],
  },
  {
    question: "6. Facing Eviction?",
    options: [
      {
        text: "Pretend to be someone else when the authorities arrive to deliver the eviction notice.",
        score: 1,
      },
      {
        text: "Pretend to be someone else when the authorities arrive to deliver the eviction notice.",
        score: 2,
      },
      {
        text: "Get your friend to pose as a fake lawyer to buy you some time",
        score: 3,
      },
    ],
  },
  {
    question: "7. Need to Conceal Assets in a Divorce?",
    options: [
      {
        text: "Rent a private island in international waters and declare it a sovereign nation with its own laws",
        score: 1,
      },
      {
        text: "Tell your ex you've invested all your assets in a startup that converts bad vibes into cryptocurrency – it's called 'Karma-Coin'",
        score: 2,
      },
      { text: "Bribe the other lawyer", score: 3 },
    ],
  },
];

const quizVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const buttonClickVariants = {
  animate: {
    // backgroundColor: ["#007bff", "#0056b3", "#007bff"],
    transition: {
      duration: 0.6,
      repeat: 2,
      repeatType: "mirror",
    },
  },
};

const Quiz = ({ onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [clickedOptionIndex, setClickedOptionIndex] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false); // Track if navigating without option click

  const handleOptionClick = (score, index) => {
    setIsNavigating(false);
    const newScore =
      totalScore - (selectedOptions[currentQuestion]?.score || 0) + score;
    setTotalScore(newScore);
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = { index, score };
    setSelectedOptions(updatedSelectedOptions);
    setClickedOptionIndex(index);
  };

  const handleNextClick = () => {
    setIsNavigating(true);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setClickedOptionIndex(null);
    } else {
      onFinish(totalScore);
    }
  };

  const handlePreviousClick = () => {
    setIsNavigating(true);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setClickedOptionIndex(
        selectedOptions[currentQuestion - 1]?.index || null
      );
    }
  };

  return (
    <div className={styles.quizContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={quizVariants}
          className={styles.questionBlock}
        >
          <div className={styles.questionContainer}>
            <motion.h2
              key={currentQuestion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {questions[currentQuestion].question}
            </motion.h2>
          </div>
          <div className={styles.options}>
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                className={`${styles.button} ${
                  selectedOptions[currentQuestion]?.index === index
                    ? styles.selected
                    : ""
                } ${
                  !isNavigating && clickedOptionIndex === index
                    ? styles.fading
                    : ""
                }`}
                onClick={() => handleOptionClick(option.score, index)}
                variants={buttonClickVariants}
                whileHover="animate"
                whileTap="animate"
              >
                {option.text}
              </motion.button>
            ))}
          </div>
          <div className={styles.navigationButtons}>
            {currentQuestion > 0 && (
              <button
                className={styles.previousButton}
                onClick={handlePreviousClick}
              >
                Previous
              </button>
            )}
            <button
              className={styles.nextButton}
              onClick={handleNextClick}
              disabled={clickedOptionIndex === null}
            >
              Next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
