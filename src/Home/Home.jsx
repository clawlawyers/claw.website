import React from "react";
import Banner from "./Banner/Banner";
import SearchGPT from "./SearchGPT/SearchGPT";
import "./Home.module.css";
import Features from "./Features/Features";
import Blogs from "./Blogs/Blogs";
import Particles from "@tsparticles/react";
import TestimonialCard from "./Testimonial/Testimonial";
import VideoBannerHome from "./VideoBanner/Home";
import DocumentViewer from "../components/DocumentsComponent/DocumentViewer";

function Home({ featuresRef, engineReady, particleOptions }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {engineReady && <Particles id="tsparticles" options={particleOptions} />}
      <Banner />
      <SearchGPT />
      <VideoBannerHome />
      <DocumentViewer />
      <div
        className="relative bg-transparent flex flex-col gap-10"
        style={{ position: "relative", backgroundColor: "transparent" }}>
        <div
          style={{
            position: "absolute",
            height: 710,
            width: 710,
            top: 500,
            right: "-370px",
            background:
              "radial-gradient(circle, rgba(0, 128, 128,0.45) 0%, rgba(0, 128, 128, 0.15) 65%)",
            boxShadow: "0 0 100px 100px rgba(0, 128, 128, 0.15)",
            borderRadius: 723,
          }}
        />
        <Features ref={featuresRef} />
        <br />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="font-bold text-[32px] md:text-7xl">Testimonials</h1>

            <p className="text-[8px] md:text-2xl font-semibold text-[#777]">
              Get to know what the professionals got to say
            </p>
          </div>
          <TestimonialCard />
          {/* <br /> */}
        </div>
        <Blogs />
      </div>
    </div>
  );
}

export default Home;
