import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header'
import Banner from './Banner/Banner'
import SearchGPT from './SearchGPT/SearchGPT'
import "./Home.module.css"
import Features from './Features/Features'
import Blogs from './Blogs/Blogs'
import FooterBanner from '../FooterBanner/FooterBanner'


function Home() {
    const featuresRef = useRef(null);
    const blogsRef = useRef(null);
    return (
        <div style={{ position: "relative", width: "100%", backgroundColor: "#13161f" }}>
            <div style={{ position: "absolute", marginLeft: "calc(50vw - 400px)", height: 943, width: 761, background: "radial-gradient(circle, rgba(137, 64, 255,0.45) 0%, rgba(137, 64, 255, 0.15) 65%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.15)", top: "-500px", borderRadius: 500 }} />
            <Header
                onClickBlogs={() => blogsRef?.current?.scrollIntoView({ behavior: "smooth" })}
                onClickFeatures={() => featuresRef?.current?.scrollIntoView({ behavior: "smooth" })}
            />
            <Banner />
            <SearchGPT />
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", height: 710, width: 710, top: 500, right: "-370px", background: "radial-gradient(circle, rgba(137, 64, 255,0.2) 0%, rgba(137, 64, 255, 0.06) 70%)", boxShadow: "0 0 90px 90px rgba(137, 64, 255, 0.06)", borderRadius: 723 }} />

                <Features ref={featuresRef} />
                <Blogs ref={blogsRef} />
            </div>
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", height: 428, width: 428, left: 50, top: "-214px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <div style={{ position: "absolute", height: 428, width: 428, right: "-200px", top: "-200px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <FooterBanner />
            </div>
        </div>
    )
}

export default Home