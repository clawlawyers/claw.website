import React from 'react'
import FooterBanner from '../FooterBanner/FooterBanner'
import Header from '../Header/Header'

export default function Pricing() {
    return (
        <div style={{ position: "relative", width: "100%", backgroundColor: "#13161f", display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ position: "absolute", marginLeft: "calc(50vw - 400px)", height: 943, width: 761, background: "radial-gradient(circle, rgba(137, 64, 255,0.45) 0%, rgba(137, 64, 255, 0.15) 65%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.15)", top: "-500px", borderRadius: 500 }} />
            <Header />
            <div style={{ width: "100%", flex: 1, color: "white", zIndex: 2 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <h1 style={{ fontSize: 45, fontWeight: 800 }}>
                        Your First Month FREE with Claw's Exclusive Offer
                    </h1>
                    <div style={{ width: "70%" }}>
                        <h5 style={{ fontSize: 25, fontWeight: 500 }}>
                            Experience the Future of Legal Services Without Commitment – Dive into One Month of Claw, On the House!
                        </h5>
                    </div>
                </div>
            </div>
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", height: 428, width: 428, left: 50, top: "-214px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <div style={{ position: "absolute", height: 428, width: 428, right: "-200px", top: "-200px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <FooterBanner />
            </div>
        </div>
    )
}
