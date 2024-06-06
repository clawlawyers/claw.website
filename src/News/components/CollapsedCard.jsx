// src/ArticleCard.js (CollapsedCard Component)
import React from "react";
import "./Collapsed.css";

export function CollapsedCard({ newsData }) {
  return (
    <div
      className="card"
      style={{ backgroundColor: "transparent" }}
      key={newsData?.id}
    >
      {newsData.image_url ? (
        <img src={newsData?.image_url} alt={newsData?.title} />
      ) : (
        <div
          style={{ backgroundColor: "#444444", display: "flex" }}
          className="placeholder"
        >
          <span>{newsData?.title}</span>
        </div>
      )}
      <div className="card-content">
        <div className="card-header">
          <span className="read-time">{newsData?.readTime}</span>
        </div>
        <h3>{newsData?.title}</h3>
        <p>{newsData?.description?.substring(0, 100)}...</p>
      </div>
    </div>
  );
}
