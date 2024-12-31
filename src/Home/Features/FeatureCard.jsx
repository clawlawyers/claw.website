import React from "react";
import Styles from "./FeatureCard.module.css";
import { motion } from "framer-motion";

export default function FeatureCard({ imageSrc, heading, subHeading }) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={Styles.cardContainer}>
      <div style={{ textAlign: "center", backgroundColor: "#171E26" }}>
        <div style={{ backgroundColor: "#171E26" }}>
          <img
            className="w-10 h-10"
            alt="Feature icon"
            style={{ backgroundColor: "#171E26" }}
            src={imageSrc}
          />
        </div>
        <h3 style={{ backgroundColor: "#171E26" }}>{heading}</h3>
        <h5 style={{ color: "#777", backgroundColor: "#171E26" }}>
          {subHeading}
        </h5>
      </div>
    </motion.div>
  );
}
