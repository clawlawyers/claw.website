import React from "react";

import Styles from "./index.module.css";
import { Link } from "react-router-dom";

export function CollapsedBlogCard({
  imageHeading,
  imageSubHeading,
  heading,
  blogNo = 0,
  createdAt,
  mainImg,
}) {
  return (
    <div className={Styles.blogCardContainer}>
      <div
        style={{
          width: "100%",
          height: "329px",
          borderRadius: 20,
          backgroundImage: mainImg
            ? ""
            : `var(--image-blog${parseInt(blogNo % 2)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className={Styles.blogCardOverlay}>
          <div
            style={{
              backgroundColor: "transparent",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                textDecoration: "underline",
                backgroundColor: "transparent",
                fontFamily: "Syne",
                fontSize: 25,
              }}
            >
              {mainImg ? "" : imageHeading}
            </div>
            <div
              style={{
                backgroundColor: "transparent",
                fontFamily: "Syne",
                fontSize: 25,
              }}
            >
              {mainImg ? "" : imageSubHeading}
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.blogCardContent}>
        <div className="w-full absolute top-4 right-0 py-2 px-3 flex justify-between items-center">
          <img className="rounded-3xl max-h-80" src={mainImg} />
        </div>
        <div>
          <h6 style={{ fontSize: 15, fontWeight: 400, color: "#D9D9DA" }}>
            {createdAt}
          </h6>
          <h3 className={Styles.blogCardHeading}>{heading}</h3>
        </div>
        <button
          style={{
            borderRadius: 15,
            backgroundColor: "#008080",
            padding: 10,
            width: "fit-content",
            border: "none",
          }}
        >
          <Link
            to={`/blog/${heading}`}
            state={{ blogNo }}
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
    </div>
  );
}

export function CollapsedBlogCardSkeleton() {
  return (
    <div className={Styles.blogCardContainer}>
      <div
        className={Styles.shimmer}
        style={{
          minWidth: "min(100%,359px)",
          height: "329px",
          borderRadius: 20,
        }}
      />
      <div className={Styles.blogCardContent}>
        <div
          className={Styles.shimmer}
          style={{ width: "80%", height: 47, marginBottom: 25 }}
        />
        <div className={Styles.shimmer} style={{ width: "90%", height: 100 }} />
      </div>
    </div>
  );
}
