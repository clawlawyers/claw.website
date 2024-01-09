import React from 'react'
import Style from './HowItWorks.module.css'
import network from '../assets/images/network.png'
import visibility from '../assets/images/increasedVisibility.png'
import business from '../assets/images/businessGrowth.png'

function HowItWorks() {
    return (
        <div className={Style.main}>
            <div className={Style.header}>How It Works</div>
            <div className={Style.title}>Benifits of Claw for Lawyers & Charted Accountants</div>
            <div className={Style.features}>
                <div className={Style.networkContainer}>
                    <div>
                        <img src={network} />
                        <h5>Increased Visibility</h5>
                        <p>When you join Claw, you showcase your expertise & attract clients who are actively seeking your services.</p>
                    </div>
                </div>
                <div className={Style.visibilityContainer}>
                    <img src={visibility} />
                    <h5>Enhanced Networking</h5>
                    <p>Claw provide a platform for professionals to connect with their target audience & build meaningful relationship.</p>
                </div>
                <div className={Style.businessContainer}>
                    <img src={business} />
                    <h5>Business Growth</h5>
                    <p>By being a part of Claw, you can expand your client base & increase your business opportunities.</p>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks