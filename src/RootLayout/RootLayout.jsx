import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../Header/Header';
import FooterBanner from '../FooterBanner/FooterBanner';

export default function RootLayout({onClickFeatures}) {
    return (
        <div style={{ position: "relative", backgroundColor: "#13161f", width: "100%" }}>
            <div style={{ position: "absolute", marginLeft: "calc(50vw - 400px)", height: 943, width: 761, background: "radial-gradient(circle, rgba(0, 128, 128,0.45) 0%, rgba(0, 128, 128, 0.15) 65%)", boxShadow: "0 0 100px 100px rgba(0, 128, 128, 0.15)", top: "-500px", borderRadius: 500 }} />
            <Header onClickFeatures={onClickFeatures} />
            <Outlet />
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", height: 428, width: 428, left: 50, top: "-214px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <div style={{ position: "absolute", height: 428, width: 428, right: "-200px", top: "-200px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <FooterBanner />
            </div>
        </div>
    )
}
