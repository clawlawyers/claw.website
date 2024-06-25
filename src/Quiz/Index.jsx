import React, { useState } from "react";
import Door from "./components/Door";
// import Quiz from "./components/Quiz";
import Result from "./components/Result";
import styles from "./App.module.css";
import Button from "@mui/material/Button";
import BlinkingButton from "./components/btn";

const QuizMain = () => {
  const [stage, setStage] = useState("start");
  const [score, setScore] = useState(0);

  const handleStart = () => setStage("door");

  const handleRestart = () => setStage("start");

  return (
    <div className={styles.App}>
      {/* <BlinkingButton /> */}

      {stage === "start" && (
        <Button onClick={handleStart} variant="contained" size="large">
          Start Quiz
        </Button>
      )}
      {stage === "door" && (
        <Door
          setScore={setScore}
          setStage={setStage}
          onStart={() => setStage("door")}
        />
      )}
      {/* {stage === "quiz" && <Quiz onFinish={handleFinish} />} */}
      {stage === "result" && <Result score={score} onRestart={handleRestart} />}
    </div>
  );
};

export default QuizMain;
