// src/ExpandedCard.js
import React from "react";
import "./ExpendedCard.css";

export function ExpandedCard({ newsData }) {
  const newsItem = newsData[1];

  return (
    <div className="expanded-card">
      <div className="expanded-image-container">
        {newsItem?.image_url ? (
          <img
            src={newsItem.image_url}
            alt="News"
            style={{ height: "auto" }}
            className="expanded-image"
          />
        ) : (
          <div className="expanded-placeholder">
            <span>{newsItem?.title}</span>
          </div>
        )}
      </div>
      <div className="expanded-text-container">
        <h1>{newsItem?.title}</h1>
        <p>{newsItem?.description?.substring(0, 100)}...</p>
        <p className="category">Movies • 4 min read</p>
      </div>
    </div>
  );
}
