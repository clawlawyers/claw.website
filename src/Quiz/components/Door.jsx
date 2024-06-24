import React, { useEffect } from "react";
import { gsap } from "gsap";
import styles from "./Door.module.css";

const Door = ({ onStart }) => {
  useEffect(() => {
    gsap.set(".door", { perspective: "400vw" });

    const openDoor = () => {
      const tl = gsap
        .timeline({ yoyo: true, repeat: 0 })
        .add("startTL")
        .fromTo(
          "#card-left",
          { rotationY: 0 },
          {
            rotationY: 85,
            transformOrigin: "0",
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
            transformOrigin: "100%",
            ease: "sine.inOut",
            duration: 2.5,
          },
          "startTL"
        )
        .to(
          "#questions",
          {
            opacity: 1,
            duration: 1.5,
            ease: "sine.inOut",
          },
          "startTL+=1"
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

  return (
    <div className={styles.lPage} style={{ width: "90%" }}>
      <header className={styles.lHeader}>
        <div className={styles.lHeaderFirst}>
          <div className={styles.logoContainer}></div>
          <div className={styles.toggleContainer}>
            <div className={styles.toggleElement}></div>
            <p>Menu</p>
          </div>
        </div>
      </header>
      <main className={styles.lMain}>
        <div className={styles.lHomeHero}>
          <div className={styles.doorWrap}>
            <div id="door-left" className={`${styles.door} ${styles.left}`}>
              <div id="card-left" className={`${styles.card} ${styles.left}`}>
                <svg>
                  <rect
                    id="rhomb1"
                    fill="#99badd"
                    width="20"
                    height="30"
                    x="230"
                    y="120"
                  />
                  <polygon
                    id="hockey1"
                    fill="#99badd"
                    points="300,150 250,100 230,100 210,70 250,70"
                  />
                  <polygon
                    id="hockey2"
                    fill="#99badd"
                    points="300,120 250,50 230,50 210,20 270,20"
                  />
                  <polygon
                    id="tri1"
                    fill="#99badd"
                    points="290,20 310,5 310,35"
                  />
                </svg>
              </div>
            </div>
            <div id="door-right" className={`${styles.door} ${styles.right}`}>
              <div id="card-right" className={`${styles.card} ${styles.right}`}>
                <svg>
                  <polygon
                    id="tri2"
                    fill="#99badd"
                    points="290,20 310,5 310,35"
                  />
                  <polygon
                    id="hockey3"
                    fill="#99badd"
                    points="300,150 250,100 230,100 210,70 250,70"
                  />
                  <polygon
                    id="hockey4"
                    fill="#99badd"
                    points="300,120 250,50 230,50 210,20 270,20"
                  />
                  <rect
                    id="rhomb2"
                    fill="#99badd"
                    width="20"
                    height="30"
                    x="370"
                    y="120"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div id="questions" className={styles.questions}>
            {/* Questions content goes here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Door;
