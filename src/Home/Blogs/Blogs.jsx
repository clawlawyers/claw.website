import React from 'react'
import BlogCard from './BlogCard'

export default function Blogs() {
    return (
        <div style={{ zIndex: 2, backgroundColor: "transparent", width: "100%", paddingTop: 50, color: "white" }}>
            <div style={{ width: "100%", textAlign: "center", backgroundColor: "transparent", fontSize: 70, fontWeight: 600 }}>
                Insights and
                <span style={{ position: "relative", display: "inline-block", backgroundColor: "transparent" }}>
                    <span style={{ position: "relative", background: "transparent", zIndex: 10 }}>Update</span>
                    <div style={{ position: "absolute", width: "96%", bottom: 20, left: "2%", height: 12, backgroundColor: "#8940FF" }} />
                </span>
            </div>
            <div style={{ width: "100%" }}>
                <BlogCard blogNo={0} imageHeading={"Claw's"} imageSubHeading={"Quick Guide"} heading={"Claw’s Quick Guide"} subHeading={"Effortlessly navigate CLAW's user-friendly interface and discover the seamless journey of hiring the perfect legal expert tailored to your needs."} />
                <BlogCard blogNo={1} imageHeading={"LegalGPT: "} imageSubHeading={"Transformative Insights"} heading={"LegalGPT: Transformative Insight"} subHeading={"Explore the cutting-edge integration of Legal GPT on CLAW, unlocking a world of intelligent and insightful legal assistance for your every query and concern."} />
            </div>
        </div>
    )
}
