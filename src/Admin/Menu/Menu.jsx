import React from 'react';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { RiUserStarLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Styles from './Menu.module.css';

export default function Menu() {
    const modelNames = [
        'home',
        'users',
        'subscribed-users',
        'referral-code',
        'visitors'
    ];

    const iconMap = {
        "home": <GoHome />,
        'users': <FiUsers />,
        "subscribed-users": <RiUserStarLine />,
        "referral-code": <AiOutlineShoppingCart />,
        "visitors": "👀"
    };
    return (
        <div className={Styles.menu}>
            <span className={Styles.title}>Collections</span>
            {modelNames.map((resource, index) => (
                <div className={Styles.item} key={index}>
                    <Link to={resource === 'home' ? '/admin' : `/admin/${resource}`} className={Styles.listItem}>
                        {iconMap[resource]}
                        <span className={Styles.listItemTitle}>{resource}</span>
                    </Link>
                </div>
            ))}
        </div>
    );
}
