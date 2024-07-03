import React, { useEffect } from "react";
import { gsap } from "gsap";
import styles from "./Door.module.css";
import Quiz from "./Quiz";

const Door = ({ onStart, setStage, setScore }) => {
  useEffect(() => {
    gsap.set(".door", { perspective: "400vw" });

    const openDoor = () => {
      const tl = gsap
        .timeline({ yoyo: false, repeat: 0 })
        .add("startTL")
        .fromTo(
          "#card-left",
          { rotationY: 0 },
          {
            rotationY: 85,
            transformOrigin: "left center",
            ease: "sine.inOut",
            duration: 2.5,
          },
          "startTL"
        )
        .fromTo(
          "#card-right",
          { rotationY: 0 },
          {
            rotationY: -85,
            transformOrigin: "right center",
            ease: "sine.inOut",
            duration: 2.5,
          },
          "startTL"
        )
        .to(
          "#questions",
          {
            opacity: 1,
            duration: 0.5,
            ease: "sine.inOut",
          },
          "startTL+=0.5"
        )
        .to(
          ["#card-left", "#card-right"], // Only target the cards, not the doors
          {
            opacity: 0,
            duration: 1, // Adjust the duration as needed for the fade-out effect
            ease: "power1.inOut",
          },
          "startTL+=2" // Adjust timing if necessary to synchronize with other animations
        )
        .eventCallback("onComplete", onStart);
    };

    openDoor();

    return () => {
      document
        .getElementById("door-left")
        ?.removeEventListener("click", openDoor);
      document
        .getElementById("door-right")
        ?.removeEventListener("click", openDoor);
    };
  }, [onStart]);

  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setStage("result");
  };

  return (
    <main className={styles.lMain}>
      <div className={styles.lHomeHero}>
        <div className={styles.doorWrap}>
          <div id="door-left" className={`${styles.door} ${styles.left}`}>
            <div
              id="card-left"
              className={`${styles.card} ${styles.left}`}
            ></div>
          </div>
          <div id="door-right" className={`${styles.door} ${styles.right}`}>
            <div
              id="card-right"
              className={`${styles.card} ${styles.right}`}
            ></div>
          </div>
        </div>

        <div
          id="questions"
          style={{ zIndex: "10" }}
          className={styles.questions}
        >
          {<Quiz onFinish={handleFinish} />}
        </div>
      </div>
    </main>
  );
};

export default Door;
