import React, { forwardRef } from 'react'


import FeatureCard from './FeatureCard';
import Styles from "./Features.module.css";


import banner1 from "../../assets/icons/banner1.png";
import banner2 from "../../assets/icons/banner2.png";
import banner3 from "../../assets/icons/banner3.png";

export default forwardRef(function Features(props, ref) {
    return (
        <div ref={ref} style={{ width: "100%", paddingTop: 80, color: "white" }}>
            <div style={{ width: "100%" }}>
                <h3 className={Styles.featuresSubHeading}>
                    Seamless Tool, Trusted Guidance
                </h3>
                <h1 className={Styles.featuresHeading}>
                    Explore Powerful
                    <span style={{ position: "relative", display: "inline-block" }}>
                        <span style={{ position: "relative", background: "transparent", zIndex: 10 }}>Features</span>
                        <div style={{ position: "absolute", width: "100%", bottom: 0, left: 0, height: 12, backgroundColor: "#008080" }} />
                    </span>
                </h1>
            </div>
            <div className={Styles.featuresCardContainer}>

                <FeatureCard imageSrc={banner1} heading={"Automation"} subHeading={"Streamline legal workflows effortlessly with intelligent automation, saving time and reducing manual tasks."} />
                <FeatureCard imageSrc={banner2} heading={"Precision"} subHeading={"Experience pinpoint accuracy in legal insights and advice, ensuring your solutions are tailored to your exact needs."} />
                <FeatureCard imageSrc={banner3} heading={"Accessibility"} subHeading={"Enjoy easy access to legal information anytime, anywhere, fostering a more accessible and inclusive legal experience for everyone."} />
            </div>
        </div >
    )
})
