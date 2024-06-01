import Styles from "./index.module.css"

export function CollapsedCard({image, heading, subHeading}) {
    return (
        <div className={Styles.newsCardContainer}>     
            <img src={image} alt={heading}/>

            <div className={Styles.newsCardContent}>
                <div style={{display: "inline"}}>
                <span style={{color:"#04FEFE"}}>Movies </span> 
                <span>&#x2022;</span>
                <span> 4 min read</span>
                </div>
                <h3 className={Styles.newsCardHeading}>
                    {heading}
                </h3>
                <h4 className={Styles.newsCardSubHeading}>
                    {subHeading}
                </h4>
            </div>
        </div>
    )
}