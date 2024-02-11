import React from 'react';

export default function BlogCard({ imageHeading, imageSubHeading, heading, subHeading, blogNo }) {
    return (
        <div style={{ zIndex: 2, position: "relative", display: "flex", padding: 5, width: "80%", margin: "auto", marginTop: 25, borderRadius: 25 }}>
            <div style={{ minWidth: "359px", minHeight: "329px", background: `var(--image-blog${blogNo})` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", fontSize: 47, fontWeight: 600, backgroundColor: "transparent" }}>
                    <div style={{ backgroundColor: "transparent" }}>
                        <div style={{ textDecoration: "underline", backgroundColor: "transparent" }}>{imageHeading}</div>
                        <div style={{ backgroundColor: "transparent" }}>{imageSubHeading}</div>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: 15, marginRight: 100, textWrap: "wrap" }}>
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
