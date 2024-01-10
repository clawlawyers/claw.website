import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Banner from './Banner/Banner'
import HowItWorks from '../HowItWorks/HowItWorks'
import Testimonials from '../Testimonials/Testimonials'
import FooterBanner from '../FooterBanner/FooterBanner'
import GigForm from '../GigForm/GigForm'
import { useRef } from 'react'
// import loaderImgOne from '../assets/icons/loaderImgOne.png'
// import loaderImgTwo from '../assets/icons/loaderImgTwo.png'
// import loaderImgThree from '../assets/icons/loaderImgThree.png'


function Home() {

    const [isPageLoaded, setPageLoaded] = useState(false)

    // const [images, setImages] = useState([loaderImgOne, loaderImgTwo, loaderImgThree])



    const home = useRef(null);
    const howItworks = useRef(null);
    const testimonial = useRef(null);
    function locateHome() {
        window.scrollTo({
            top: home.current.offsetTop,
            behavior: 'smooth'
        })
    }

    function locateHowItWorks() {
        window.scrollTo({
            top: howItworks.current.offsetTop,
            behavior: 'smooth'
        })
    }

    function locateTestimonial() {
        window.scrollTo({
            top: testimonial.current.offsetTop,
            behavior: 'smooth'
        })
    }
    return (
        <div>

            <Header home={locateHome} howItworks={locateHowItWorks} testimonial={locateTestimonial} />
            <div ref={home}>
                <Banner />
            </div>
            <div ref={howItworks}>
                <HowItWorks />
            </div>
            <div ref={testimonial}>
                <Testimonials />
            </div>
            <GigForm />
            <FooterBanner />
        </div>
    )
}

export default Home