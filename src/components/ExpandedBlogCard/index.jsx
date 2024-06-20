import React from "react";
import { motion } from "framer-motion";

import Styles from "./index.module.css";
import { Link } from "react-router-dom";
import blog0 from "../../assets/icons/blog0.png";

export function ExpandedBlogCard({
  imageHeading,
  imageSubHeading,
  heading,
  subHeading,
  blogNo = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.25 }}
      className={Styles.blogCardContainer}
    >
      <img
        alt="blogs"
        style={{ height: "inherit", borderRadius: "inherit" }}
        src={blog0}
      />

      <div className={Styles.blogCardContent}>
        <h3 className={Styles.blogCardHeading}>{heading}</h3>
        <h4 className={Styles.blogCardSubHeading}>{subHeading}</h4>
        <button
          style={{
            borderRadius: 15,
            backgroundColor: "#008080",
            padding: 10,
            width: "fit-content",
            marginTop: 15,
            border: "none",
          }}
        >
          <Link
            to={`/blog/${heading}`}
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: 600,
              border: "none",
              backgroundColor: "transparent",
              textDecoration: "none",
            }}
          >
            Read more
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
