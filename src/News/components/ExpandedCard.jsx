// src/ExpandedCard.js
import React from "react";
import "./ExpendedCard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function ExpandedCard({ newsData }) {
  const newsItem = newsData[1];

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
            <span>{newsItem?.title}</span>
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
            backgroundColor: "#008080",
            padding: 10,
            width: "fit-content",
            marginTop: 15,
            border: "none",
          }}
        >
          <a
            href={newsItem?.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: 600,
              border: "none",
              backgroundColor: "transparent",
              textDecoration: "none",
            }}
          >
            Read More
          </a>
        </button>
      </div>
    </div>
  );
}
