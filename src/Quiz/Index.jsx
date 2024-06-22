import React, { useState } from "react";
import Door from "./components/Door";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import styles from "./App.module.css";

const App = () => {
  const [stage, setStage] = useState("start");
  const [score, setScore] = useState(0);

  const handleStart = () => setStage("door");
  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setStage("result");
  };
  const handleRestart = () => setStage("start");

  return (
    <div className={styles.App}>
      {stage === "start" && <button onClick={handleStart}>Start Quiz</button>}
      {stage === "door" && <Door onStart={() => setStage("quiz")} />}
      {stage === "quiz" && <Quiz onFinish={handleFinish} />}
      {stage === "result" && <Result score={score} onRestart={handleRestart} />}
    </div>
  );
};

export default App;
