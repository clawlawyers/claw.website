import React, { useState } from "react";
import courtroom from "../../assets/images/Courtroom.png";
import feature1 from "../../assets/images/image 2.png";
import feature2 from "../../assets/images/image 3.png";
import feature3 from "../../assets/images/image 4.png";
import laptop from "../../assets/images/image 1.png";
import plus from "../../assets/images/Group 53.png";
import Styles from "./CourtRoomHome.module.css";
import arrw from "../../assets/images/Vector 1.png";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

function SamplePrevArrow(props) {
  const { className, style } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

function Home() {
  const [submitHover, setSubmitHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <motion.div
      whileHover="hover"
      onHoverStart={() => setSubmitHover(true)}
      onHoverEnd={() => setSubmitHover(false)}
      className=""
    >
      {/* top container */}
      <div className="md:grid md:grid-cols-2 items-center px-2 md:px-28">
        <div className="pl-28">
          <h1 className="px-5 text-start">What is Courtroom ?</h1>
          <br />
          <div className="p-5">
            <div className="slider-container">
              <Slider {...settings}>
                <div>
                  <h3 className="text-[#B7B2B2]">
                    Experience the trailer of the case you are going to fight
                    tommorow
                  </h3>
                </div>
                <div>
                  <h3 className="text-[#B7B2B2]">
                    Your mock trial before the real case begins
                  </h3>
                </div>
                <div>
                  <h3 className="text-[#B7B2B2]">
                    Your case assistant who does everything you want
                  </h3>
                </div>
              </Slider>
            </div>
          </div>
          <br />

          <div className="flex px-5 gap-5">
            <Link to="/court-room/book-now">
              <motion.button
                style={{
                  position: "relative",
                  display: "inline-block",
                  border: "2px solid white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  overflow: "hidden",
                  background: "#008080",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                whileHover="hover"
              >
                <motion.div
                  variants={{
                    hover: { x: "100%" },
                  }}
                  initial={{ x: "0%" }}
                  transition={{ type: "tween", duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "#0E1118",
                    zIndex: 1,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  Book A Courtroom
                </span>
              </motion.button>
            </Link>
            <Link to="/court-room/login">
              <motion.button
                style={{
                  position: "relative",
                  display: "inline-block",
                  border: "2px solid white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  overflow: "hidden",
                  background: "#008080",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                whileHover="hover"
              >
                <motion.div
                  variants={{
                    hover: { x: "100%" },
                  }}
                  initial={{ x: "0%" }}
                  transition={{ type: "tween", duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "#0E1118",
                    zIndex: 1,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  Enter Your Courtroom
                </span>
              </motion.button>
            </Link>
          </div>
        </div>
        <div className="">
          <motion.img
            initial={{ x: "100%" }}
            variants={{
              hover: { x: "0%" },
            }}
            // whileHover={{ x: "0%" }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            alt="court-room"
            className="h-full w-full"
            style={{
              backgroundColor: "transparent",
              // height: "75%",
              // width: "75%",
            }}
            src={courtroom}
          />
        </div>
      </div>
      {/* 2nd container */}
      <div className="grid grid-cols-3 m-5 p-10">
        <motion.div
          initial={{ x: ["100%"] }}
          whileInView={{ x: "0%" }}
          transition={{ type: "slide", duration: 0.1 }}
          whileHover={{ scale: "0.9" }}
          className={Styles.courtRoomCard}
        >
          <br />
          <img
            alt="Feature Heading"
            src={feature1}
            style={{ height: 90, width: 90, borderRadius: 0 }}
          />
          <br />
          <h1 style={{ fontSize: "25px" }}>AI Junior</h1>
          <br />
          <h3
            style={{ fontSize: "20px", color: "#B7B2B2", textAlign: "center" }}
          >
            First draft of argument sets compiled for you by AI
          </h3>
        </motion.div>

        <motion.div
          initial={{ x: ["0%"] }}
          whileInView={{ x: "0%" }}
          transition={{ type: "slide", duration: 0.1 }}
          whileHover={{ scale: "0.9" }}
          className={Styles.courtRoomCard}
        >
          <br />
          <img
            alt="Feature Heading"
            src={feature2}
            style={{ height: 90, width: 90, borderRadius: 0 }}
          />
          <br />
          <h1 style={{ fontSize: "25px" }}>AI Lawyer</h1>
          <br />
          <h3
            style={{ fontSize: "20px", color: "#B7B2B2", textAlign: "center" }}
          >
            Counter arguments backed by all Indian law
          </h3>
        </motion.div>

        <motion.div
          initial={{ x: ["-100%"] }}
          whileInView={{ x: "0%" }}
          transition={{ type: "slide", duration: 0.1 }}
          whileHover={{ scale: "0.9" }}
          className={Styles.courtRoomCard}
        >
          <br />
          <img
            alt="Feature Heading"
            src={feature3}
            style={{ height: 90, width: 90, borderRadius: 0 }}
          />
          <br />
          <h1 style={{ fontSize: "25px" }}>AI Judge</h1>
          <br />
          <h3
            style={{ fontSize: "20px", color: "#B7B2B2", textAlign: "center" }}
          >
            Validity, Importance and character based scoring and conclusion
          </h3>
        </motion.div>
      </div>

      <div
        style={{
          marginTop: "200px",
          margin: "45px 150px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "700px",
          }}
        >
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
        </div>
        <div style={{ display: "grid", placeItems: "center" }}>
          <div style={{ height: "400px" }}>
            <img
              alt="courtRoom Preiview"
              src={laptop}
              style={{ borderRadius: 0, width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "700px",
          }}
        >
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
        </div>
      </div>

      <div style={{ width: "40%", marginLeft: "600px" }}>
        <img
          alt="arrow"
          src={arrw}
          style={{ borderRadius: 0, width: "100%", height: "100%" }}
        />
      </div>

      <motion.div
        // whileHover="hover"
        // onHoverStart={() => setSubmitHover(true)}
        // onHoverEnd={() => setSubmitHover(false)}
        className="flex items-center justify-center mt-[150px] mx-10 p-5"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <motion.h1
            initial={{ y: -60 }}
            // variants={{
            //   view: { y: 0 },
            // }}
            whileInView={{ y: 0 }}
            transition={{
              y: { type: "tween", duration: 0.8 },
            }}
          >
            SUBMIT YOUR CASE
          </motion.h1>
          <motion.h3
            style={{ fontSize: "22px", color: "#B7B2B2" }}
            initial={{ opacity: 0 }}
            // variants={{
            //   hover: { opacity: 1 },
            // }}
            whileInView={{ opacity: 1 }}
            transition={{
              x: { type: "slide", duration: 1 },
            }}
          >
            Add case details in the format of courtroom judgement , statement of
            claim, statement of defence, filed application or details from
            client's perspective.
          </motion.h3>
        </div>
        <motion.div
          initial={{ x: "50%" }}
          // variants={{
          //   hover: { x: "0%" },
          // }}
          whileInView={{ x: "0%" }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <div
            style={{ display: "grid", placeItems: "center", cursor: "pointer" }}
          >
            <div style={{ height: "400px", width: "max-content" }}>
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="flex items-center justify-center  mt-[150px] mx-10 p-5">
        <motion.div
          initial={{ x: "-50%" }}
          whileInView={{ x: "0%" }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <div style={{ display: "grid", placeItems: "center" }}>
            <div style={{ height: "400px", width: "max-content" }}>
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </motion.div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <motion.h1
            initial={{ y: -60 }}
            whileInView={{ y: 0 }}
            transition={{
              y: { type: "tween", duration: 0.8 },
            }}
          >
            GET THE ARGUMENT'S DRAFT
          </motion.h1>
          <motion.h3
            style={{ fontSize: "22px", color: "#B7B2B2" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              x: { type: "slide", duration: 1 },
            }}
          >
            Get a first draft of arguments, potential counter arguments,
            judgement scores and explanations and verdict from 4 different Point
            of Views
          </motion.h3>
        </div>
      </motion.div>

      <motion.div className="flex items-center justify-center  mt-[150px] mx-10 p-5">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <motion.h1
            initial={{ y: -60 }}
            whileInView={{ y: 0 }}
            transition={{
              y: { type: "tween", duration: 0.8 },
            }}
          >
            FRAME YOUR CASE AND WIN
          </motion.h1>
          <motion.h3
            style={{ fontSize: "22px", color: "#B7B2B2" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              x: { type: "slide", duration: 1 },
            }}
          >
            Frame and finetune your arguments to turn the weights in your favor
            until you are able to crack the verdict of your choice
          </motion.h3>
        </div>
        <motion.div
          initial={{ x: "50%" }}
          whileInView={{ x: "0%" }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <div style={{ display: "grid", placeItems: "center" }}>
            <div style={{ height: "400px", width: "max-content" }}>
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className={Styles.whyCourtRoom}>
        <div>
          <h1 style={{ fontWeight: "700" }}>Why Claw Courtroom ?</h1>
        </div>
        <div style={{ display: "flex", gap: "100px" }}>
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
              }}
            >
              25000+
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Indian Legal Documents
            </h3>
          </div>
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
                textAlign: "center",
              }}
            >
              50+
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
                width: "300px",
              }}
            >
              Trusted by 50+ lawyers from Supreme court and High courts
            </h3>
          </div>
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
                textAlign: "center",
              }}
            >
              1 Cr +
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Indian Judgements
            </h3>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", placeItems: "center", marginTop: "80px" }}>
        <motion.div
          className={Styles.third}
          style={{
            width: "75%",
            position: "relative",
            overflow: "hidden",
          }}
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            variants={{
              hover: { x: "100%" },
            }}
            initial={{ x: "0%" }}
            transition={{ type: "tween", duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              background: "white",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #00ffa3, #008080)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "50%" }}>
              <h1
                style={{
                  color: "#008080",
                  fontWeight: 800,
                  textWrap: "wrap",
                }}
              >
                Experience the AI Courtroom
              </h1>
            </div>
            <button
              style={{
                backgroundColor: isHovered ? "white" : "#008080",
                color: isHovered ? "#008080" : "white",
                margin: "15px",
                padding: "12px 40px",
                borderRadius: 10,
                border: "none",
                fontSize: 27,
              }}
            >
              Contact us
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
