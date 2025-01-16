// src/ArticleCard.js (CollapsedCard Component)
import React from "react";
import "./Collapsed.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function CollapsedCard({ newsData }) {
  return (
    <div
      className="card"
      style={{ backgroundColor: "transparent" }}
      key={newsData?.id}>
      {newsData.image_url ? (
        <LazyLoadImage
          src={newsData?.image_url}
          PlaceholderSrc={newsData?.image_url}
          effect="blur"
        />
      ) : (
        // <img src={newsData?.image_url} alt={newsData?.title} loading="lazy" />
        <div
          style={{ backgroundColor: "#444444", display: "flex" }}
          className="placeholder">
          <p>{newsData?.title}</p>
        </div>
      )}
      <div className="card-content">
        <div className="card-header">
          <span className="read-time">{newsData?.readTime}</span>
        </div>
        <h4>{newsData?.title}</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <button
            style={{
              borderRadius: 15,
              backgroundColor: "#008080",
              padding: 10,
              width: "fit-content",
              marginTop: 15,
              border: "none",
            }}>
            <a
              href={newsData.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
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
        {/* <p>{newsData?.description?.substring(0, 100)}...</p> */}
      </div>
    </div>
  );
}
