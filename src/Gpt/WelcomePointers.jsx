import React from 'react';
import Styles from "./WelcomePointers.module.css";

export default function WelcomePointers({ icon: Icon, heading, subHeading, style = {} }) {
    return (
        <div className={{ ...Styles.container, ...style }}>
            <div className={Styles.iconContainer}>
                <Icon className={Styles.icon} />
            </div>
            <div className={Styles.contentContainer}>
                <div className={Styles.heading}>
                    {heading}
                </div>
                <div className={Styles.subHeading}>
                    {subHeading}
                </div>
            </div>
        </div>
    )
}
