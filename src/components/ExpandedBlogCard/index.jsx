import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Styles from "./index.module.css";
import blog0 from "../../assets/icons/blog0.png";

export function ExpandedBlogCard({
  imageHeading,
  imageSubHeading,
  heading,
  subHeading,
  blogNo = 0,
}) {
  const [hover, setHover] = useState(false); // Define hover state

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.25 }}
      className={Styles.blogCardContainer}>
      <img alt="blogs" style={{ borderRadius: "inherit" }} src={blog0} />

      <div className={Styles.blogCardContent}>
        <h3 className={Styles.blogCardHeading}>{heading}</h3>
        <h4 className={Styles.blogCardSubHeading}>{subHeading}</h4>
        <button
          style={{
            borderRadius: 15,
            backgroundImage: hover
              ? "linear-gradient(275.22deg,  #00ff9d 0.63%, #00e6ff 99.37%) "
              : "none", // Apply gradient on hover
            backgroundColor: hover ? "transparent" : "#008080",
            padding: 10,
            width: "fit-content",

            marginTop: 15,
            border: "none",
            transition: "background-color 0.3s ease", // Smooth transition
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
          <Link
            to={`/blog/${heading}`}
            style={{
              color: hover ? "rgba(55, 112, 105, 1)" : "white", // Change text color on hover
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              backgroundColor: "transparent",
              textDecoration: "none",
              transition: "color 0.3s ease", // Smooth transition for text color
            }}>
            Read More
          </Link>
        </button>
      </div>
    </motion.div>
  );
}

export function ExpandedBlogCardSkeleton() {
  return (
    <div className={Styles.blogCardContainer}>
      <div
        className={Styles.shimmer}
        style={{
          minWidth: "min(100%,250px)",
          height: "250px",
          borderRadius: 20,
        }}
      />
      <div className={Styles.blogCardContent}>
        <div
          className={Styles.shimmer}
          style={{ width: "80%", height: 35, marginBottom: 25 }}
        />
        <div className={Styles.shimmer} style={{ width: "90%", height: 100 }} />
      </div>
    </div>
  );
}
