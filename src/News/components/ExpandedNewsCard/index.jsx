import React from "react"
import Styles from "./index.module.css";
import news0 from "../../../assets/images/news0.png"

export function ExpandedCard({heading, subHeading}) {
    return (
        <div className={Styles.newsCardContainer}>
            <img src={news0} alt={heading}/>

            <div className={Styles.newsCardContent}>
                <h3 className={Styles.newsCardHeading}>
                    {heading}
                </h3>
                <h4 className={Styles.newsCardSubHeading}>
                    {subHeading}
                </h4>
                <span style={{color:"#04FEFE"}}>Movies </span> 
                <span>&#x2022;</span>
                <span> 4 min read</span>
            </div>
        </div>
    )
}