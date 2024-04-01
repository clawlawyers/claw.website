import React from 'react'
import Banner from './Banner/Banner'
import SearchGPT from './SearchGPT/SearchGPT'
import "./Home.module.css"
import Features from './Features/Features'
import Blogs from './Blogs/Blogs';
import Particles from "@tsparticles/react";


function Home({ featuresRef, engineReady, particleOptions }) {

    return (
        <div style={{ position: "relative", width: "100%" }}>
            {engineReady && <Particles
                id="tsparticles"
                options={particleOptions}
            />}
            <Banner />
            <SearchGPT />
            <div style={{ position: "relative", backgroundColor: "transparent" }}>
                <div style={{ position: "absolute", height: 710, width: 710, top: 500, right: "-370px", background: "radial-gradient(circle, rgba(0, 128, 128,0.45) 0%, rgba(0, 128, 128, 0.15) 65%)", boxShadow: "0 0 100px 100px rgba(0, 128, 128, 0.15)", borderRadius: 723 }} />
                <Features ref={featuresRef} />
                <Blogs />
            </div>
        </div>
    )
}

export default Home