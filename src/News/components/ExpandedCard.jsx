// src/ExpandedCard.js
import React, { useState } from "react";
import "./ExpendedCard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function ExpandedCard({ newsData }) {
  const newsItem = newsData[1];
  const [hover, setHover] = useState(false);
  return (
    <div className="expanded-card">
      <div className="expanded-image-container">
        {newsItem?.image_url ? (
          <LazyLoadImage
            src={newsItem?.image_url}
            PlaceholderSrc={newsItem?.image_url}
            effect="blur"
            alt="News"
            style={{ height: "auto" }}
            className="expanded-image"
          />
        ) : (
          // <img
          //   src={newsItem.image_url}
          //   alt="News"
          //   style={{ height: "auto" }}
          //   className="expanded-image"
          // />
          <div className="expanded-placeholder">
            <h5>{newsItem?.title}</h5>
          </div>
        )}
      </div>
      <div className="expanded-text-container">
        <h1>{newsItem?.title}</h1>
        {/* <p>{newsItem?.description?.substring(0, 100)}...</p> */}
        <p className="category">Movies • 4 min read</p>
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
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
          <a
            href={newsItem?.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: hover ? "rgba(55, 112, 105, 1)" : "white",
              fontSize: 17,
              fontWeight: 600,
              border: "none",
              backgroundColor: "transparent",
              textDecoration: "none",
            }}>
            Read More
          </a>
        </button>
      </div>
    </div>
  );
}
