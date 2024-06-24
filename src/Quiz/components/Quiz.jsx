import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Quiz.module.css";

const questions = [
  {
    question: "1. Ever Thought of Skipping Rent?",
    options: [
      {
        text: "Convince your landlord to accept rent in the form of home-cooked meals",
        score: 1,
      },
      { text: "claim that your dog ate your money", score: 2 },
      {
        text: "offer to make your landlord into an online sensation",
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
        text: "live alone in the mountains unnamed and come back after 30 years",
        score: 2,
      },
      {
        text: "get your friend to pose as a fake lawyer to buy you some time",
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
        text: "get your friend to pose as a fake lawyer to buy you some time",
        score: 3,
      },
    ],
  },
  {
    question: "7. Need to Conceal Assets in a Divorce?",
    options: [
      {
        text: "rent a private island in international waters and declare it a sovereign nation with its own laws",
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

const quizAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Quiz = ({ onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const handleOptionClick = (score) => {
    setTotalScore(totalScore + score);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      onFinish(totalScore);
    }
  };

  return (
    <motion.div
      className={styles.quizContainer}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={quizAnimation}
    >
      <div className={styles.questionContainer}>
        <h2>{questions[currentQuestion].question}</h2>
      </div>
      <div className={styles.options}>
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button
            style={{ margin: "10px" }}
            key={index}
            className={styles.optionButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOptionClick(option.score)}
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Quiz;
