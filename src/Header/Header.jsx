import React from 'react'

function Header() {
    return (
        <div style={{ position: "inherit", zIndex: 2, width: "100%", paddingTop: 45, paddingBottom: 45, backgroundColor: "transparent" }}>
            <div style={{ width: "80%", margin: "auto", alignItems: "center", display: "flex", justifyContent: "space-between", padding: 20, borderRadius: 20, backgroundColor: "rgba(14, 16, 29,0.6)", color: "white" }}>
                <div style={{ fontWeight: 600, fontSize: 30 }}>
                    <a href='/' style={{ textDecoration: "none", color: "white" }}>Claw</a>
                </div>
                <div style={{ display: "flex", fontWeight: 500, fontSize: 22, backgroundColor: "transparent" }}>
                    <div style={{ marginRight: 60, backgroundColor: "transparent" }}>
                        Features
                    </div>
                    <div style={{ backgroundColor: "transparent" }}>
                        Blog
                    </div>
                </div>
                <div style={{ width: 170, height: 53, borderRadius: 12, overflow: "hidden" }}>
                    <button style={{ width: "100%", height: "100%", backgroundColor: "#8940FF", border: "none", fontWeight: 700, fontSize: 16, color: "white" }}>Try LegalGPT</button>
                </div>
            </div>
        </div>
    )
}

export default Header