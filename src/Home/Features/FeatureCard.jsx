import React from 'react'

export default function FeatureCard({ imageSrc, heading, subHeading }) {
    return (
        <div style={{ zIndex: 2, flex: 1, padding: 15, width: 360, backgroundColor: "#171E26", borderRadius: 10, color: "white" }}>
            <div style={{ textAlign: "center", backgroundColor: "#171E26" }}>
                <div style={{ backgroundColor: "#171E26" }}>
                    <img style={{ backgroundColor: "#171E26" }} src={imageSrc} />
                </div>
                <div style={{ fontSize: 30, fontWeight: 600, backgroundColor: "#171E26" }}>
                    {heading}
                </div>
                <div style={{ color: "#777", backgroundColor: "#171E26" }}>
                    {subHeading}
                </div>
            </div>
        </div>
    )
}
