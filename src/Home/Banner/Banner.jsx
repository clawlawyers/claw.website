import React from 'react'
import Style from './Banner.module.css'

function Banner() {

    return (
        <div className={Style.bannerContainer}>
            <h1 className={Style.banner}>
                <div>
                    Unlock Legal Assistance
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div style={{ flex: 1 }} />
                    <div className={Style.typed}>with LegalGPT</div>
                    <div style={{ flex: 1 }} />
                </div>
            </h1>
        </div >
    )
}

export default Banner