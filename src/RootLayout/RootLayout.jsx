import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import FooterBanner from "../FooterBanner/FooterBanner";
import { Helmet } from "react-helmet";

export default function RootLayout() {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#13161f",
        background: `radial-gradient(circle at 50% 0%, #018585, transparent 45rem),
        
        radial-gradient(circle at 100% 90%, #018585, transparent 15%)
        `,
        width: "100%",
      }}
    >
      <Helmet>
        <title>
          ClawLaw: Empowering Businesses with AI-Driven Legal Solutions
        </title>
        <meta
          name="description"
          content="Claw is a legal tech company that is transforming the legal industry with its innovative use of AI. Our platform, powered by legalGPT, provides businesses with access to affordable and efficient legal services."
        />
        <meta
          name="keywords"
          content="tech, ai-driven, privacy policies, business law services, services, legal compliance, businesses, law firm automation, clawlaw"
        />
      </Helmet>
      <Header />
      <Outlet />
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "fixed",
            height: 428,
            width: 428,

            left: "1px",
            background:
              "radial-gradient(circle, rgba(0, 128, 128,0.45) 0%, rgba(0, 128, 128, 0.15) 65%)",
            boxShadow: "0 0 100px 100px rgba(0, 128, 128, 0.15)",
            borderRadius: 428,
          }}
        />
        <FooterBanner />
      </div>
    </div>
  );
}
