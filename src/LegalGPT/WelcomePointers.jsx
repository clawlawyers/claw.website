import React from 'react'

export default function WelcomePointers({ icon: Icon, heading, subHeading }) {
    return (
        <div style={{ backgroundColor: "transparent", display: "flex", flexDirection: "column", maxWidth: "202px" }}>
            <div style={{ backgroundColor: "transparent", display: "flex", justifyContent: "center" }}>
                <Icon style={{ backgroundColor: "transparent" }} />
            </div>
            <div style={{ backgroundColor: "transparent", textAlign: "center", display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ backgroundColor: "transparent" }}>
                    {heading}
                </div>
                <div style={{ backgroundColor: "transparent", fontSize: "14px", color: "#777" }}>
                    {subHeading}
                </div>
            </div>
        </div>
    )
}
