import React from 'react'
import Header from '../Header/Header'
import Banner from './Banner/Banner'
import HowItWorks from '../HowItWorks/HowItWorks'
import Testimonials from '../Testimonials/Testimonials'
import FooterBanner from '../FooterBanner/FooterBanner'

function Home() {
    return (
        <div>
            <Header />
            <Banner />
            <HowItWorks />
            <Testimonials />
            <FooterBanner />
        </div>
    )
}

export default Home