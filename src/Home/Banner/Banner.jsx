import React from 'react'
import Style from './Banner.module.css'

function Banner() {

    return (
        <div className={Style.bannerContainer}>
            <h1 className={Style.banner}>
                Unlock Legal Assistance with <span>LegalGPT</span>
            </h1>
        </div >
    )
}

export default Banner