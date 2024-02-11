import React from 'react'

export default function FeatureCard({ imageSrc, heading, subHeading }) {
    return (
        <div style={{ padding: 10, width: 360, color: "#171E26", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: 10, color: "white" }}>
            <div style={{ textAlign: "center" }}>
                <div>
                    <img src={imageSrc} />
                </div>
                <div style={{ fontSize: 30, fontWeight: 600 }}>
                    {heading}
                </div>
                <div style={{ color: "#777" }}>
                    {subHeading}
                </div>
            </div>
        </div>
    )
}
