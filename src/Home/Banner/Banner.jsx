import React from 'react'
import Style from './Banner.module.css'
import iphoneImage from '../../assets/images/iPhone.png';
import playStore from '../../assets/images/appStore.png';
import appStore from '../../assets/images/istore.png';

function Banner() {
    return (
        <div className={Style.banner}>
            <div className={Style.leftBlock}>
                <div className={Style.title}>
                    Join Claw to connect with Like minded legal minds
                </div>
                <div>
                    <img src={playStore} />
                    <img src={appStore} />
                </div>
            </div>
            <div className={Style.rightBlock}>
                <img src={iphoneImage} />
            </div>
        </div>
    )
}

export default Banner