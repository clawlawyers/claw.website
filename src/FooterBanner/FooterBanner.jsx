import React from 'react'
import Style from './FooterBanner.module.css'
import iphoneStore from '../assets/images/istore.png'
import playstore from '../assets/images/appStore.png'

function FooterBanner() {
    return (
        <div className={Style.footerBanner}>
            <div className={Style.header}>Join us on this exciting journey to become successful with Claw</div>
            <div>
                <div>
                    <img src={iphoneStore} />
                </div>
                <div>
                    <img src={playstore} />
                </div>

            </div>
        </div>
    )
}

export default FooterBanner