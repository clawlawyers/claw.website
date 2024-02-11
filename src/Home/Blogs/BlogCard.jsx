import React from 'react';

import Styles from "./BlogCard.module.css";

export default function BlogCard({ imageHeading, imageSubHeading, heading, subHeading, blogNo }) {
    return (
        <div className={Styles.blogCardContainer}>
            <div style={{ minWidth: "359px", height: "329px", backgroundImage: `var(--image-blog${blogNo})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <div style={{ height: "100%", width: "100%", fontSize: 47, fontWeight: 600, backgroundColor: "transparent" }}>
                    <div style={{ backgroundColor: "transparent", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                        <div style={{ textDecoration: "underline", backgroundColor: "transparent", fontFamily: "Syne" }}>{imageHeading}</div>
                        <div style={{ backgroundColor: "transparent", fontFamily: "Syne" }}>{imageSubHeading}</div>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: 15, marginRight: 50, textWrap: "wrap" }}>
                <div style={{ fontSize: 45, fontWeight: 600 }}>
                    {heading}
                </div>
                <div style={{ fontSize: 25, fontWeight: 400, color: "#777" }}>
                    {subHeading}
                </div>
                <div style={{ borderRadius: 15, backgroundColor: "#8940ff", padding: 10, width: "fit-content", marginTop: 15 }}>
                    <a href={'/blog/' + blogNo} style={{ color: "white", fontSize: 17, fontWeight: 600, border: "none", backgroundColor: "transparent", textDecoration: "none" }}>Read more</a>
                </div>
            </div>
        </div >
    )
}
