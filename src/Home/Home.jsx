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
        <div>
            <Header />
            <Banner />
            <SearchGPT />
            <Features />
            <Blogs />
            <FooterBanner />
        </div>
    )
}

export default Home