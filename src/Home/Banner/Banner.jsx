import React from 'react'
import Style from './Banner.module.css'

function Banner() {

    return (
        <div className={Style.bannerContainer}>
            <div className={Style.banner}>
                Unlock Legal Assistance with <span>LegalGPT</span>
            </div>
        </div >
    )
}

export default Banner