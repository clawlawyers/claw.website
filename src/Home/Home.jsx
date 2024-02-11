import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Banner from './Banner/Banner'
import SearchGPT from './SearchGPT/SearchGPT'
import "./Home.module.css"
import Features from './Features/Features'
import Blogs from './Blogs/Blogs'
import FooterBanner from '../FooterBanner/FooterBanner'


function Home() {


    return (
        <div style={{ position: "relative", width: "100%" }}>
            <div style={{ position: "absolute", marginLeft: "calc(50vw - 400px)", height: 943, width: 761, background: "radial-gradient(circle, rgba(137, 64, 255,0.45) 0%, rgba(137, 64, 255, 0.15) 65%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.15)", top: "-500px", borderRadius: 500 }} />
            <Header />
            <Banner />
            <SearchGPT />
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", height: 723, width: 723, top: 500, right: "-370px", background: "radial-gradient(circle, rgba(137, 64, 255,0.2) 0%, rgba(137, 64, 255, 0.1) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.1)", borderRadius: 723 }} />
                <Features />
                <Blogs />
            </div>
            <FooterBanner />
        </div>
    )
}

export default Home