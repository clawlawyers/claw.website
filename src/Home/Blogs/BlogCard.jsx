import React from 'react';

import Styles from "./BlogCard.module.css";
import { Link } from 'react-router-dom';

export function BlogCard({ blogId, imageHeading, imageSubHeading, heading, subHeading, blogNo = 0 }) {
    return (
        <div className={Styles.blogCardContainer}>
            <div style={{ minWidth: "min(100%,359px)", height: "329px", borderRadius: 20, backgroundImage: `var(--image-blog${parseInt(blogNo % 2)})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <div className={Styles.blogCardOverlay}>
                    <div style={{ backgroundColor: "transparent", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                        <div style={{ textDecoration: "underline", backgroundColor: "transparent", fontFamily: "Syne" }}>{imageHeading}</div>
                        <div style={{ backgroundColor: "transparent", fontFamily: "Syne" }}>{imageSubHeading}</div>
                    </div>
                </div>
            </div>
            <div className={Styles.blogCardContent}>
                <h3 className={Styles.blogCardHeading}>
                    {heading}
                </h3>
                <h4 className={Styles.blogCardSubHeading}>
                    {subHeading}
                </h4>
                <div style={{ borderRadius: 15, backgroundColor: "#8940ff", padding: 10, width: "fit-content", marginTop: 15 }}>
                    <Link to={`/legalGPT-intro/${blogId}`} state={{ blogNo }} style={{ color: "white", fontSize: 17, fontWeight: 600, border: "none", backgroundColor: "transparent", textDecoration: "none" }}>Read more</Link>
                </div>
            </div>
        </div >
    )
}


export function BlogCardSkeleton() {
    return (
        <div className={Styles.blogCardContainer}>
            <div className={Styles.shimmer} style={{ minWidth: "min(100%,359px)", height: "329px", borderRadius: 20 }} />
            <div className={Styles.blogCardContent}>
                <div className={Styles.shimmer} style={{ width: "80%", height: 47, marginBottom: 25 }} />
                <div className={Styles.shimmer} style={{ width: "90%", height: 100 }} />
            </div>
        </div >
    )
}
