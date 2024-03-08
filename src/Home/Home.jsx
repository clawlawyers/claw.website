import React from 'react'
import Banner from './Banner/Banner'
import SearchGPT from './SearchGPT/SearchGPT'
import "./Home.module.css"
import Features from './Features/Features'
import Blogs from './Blogs/Blogs';
import Particles from "@tsparticles/react";


function Home({ featuresRef, engineReady, particleOptions }) {

    function particlesLoaded() {
        console.log("particles loaded")
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
            {engineReady && <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={particleOptions}
            />}
            <Banner />
            <SearchGPT />
            <div style={{ position: "relative", backgroundColor: "transparent" }}>
                <div style={{ position: "absolute", height: 710, width: 710, top: 500, right: "-370px", background: "radial-gradient(circle, rgba(137, 64, 255,0.2) 0%, rgba(137, 64, 255, 0.06) 70%)", boxShadow: "0 0 90px 90px rgba(137, 64, 255, 0.06)", borderRadius: 723 }} />
                <Features ref={featuresRef} />
                <Blogs />
            </div>
        </div>
    )
}

export default Home