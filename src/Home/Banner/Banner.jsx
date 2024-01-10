import React from 'react'
import Style from './Banner.module.css'
import iphoneImage from '../../assets/images/iPhone.png';
import playStore from '../../assets/images/appStore.png';
import appStore from '../../assets/images/istore.png';
import { useMediaQuery } from 'react-responsive'

function Banner() {
    const isMobile = useMediaQuery({
        query: '(max-width: 800px)'
    })
    return (
        <div className={Style.banner}>
            <div className={Style.leftBlock}>
                <div className={Style.title}>
                    Join Claw to connect with Like minded legal minds
                </div>
                {!isMobile && <div>
                    <img src={playStore} />
                    <img src={appStore} />
                </div>}
            </div>
            <div className={Style.rightBlock}>
                <img src={iphoneImage} />
            </div>
            {isMobile && <div className={Style.leftBlock}>
                <div> <img src={playStore} /></div>
                <div> <img src={appStore} /></div>
            </div>}
        </div>
    )
}

export default Banner