import React, { useEffect, useState } from 'react';
import { NODE_API_ENDPOINT } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { RiUserStarLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Styles from './Menu.module.css';

export default function Menu() {
    const [resources, setResources] = useState(['home']);

    useEffect(() => {
        fetch(`${NODE_API_ENDPOINT}/admin`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);

            // Ensure data is an array
            let dataArray;
            if (Array.isArray(data)) {
                dataArray = data;
            } else if (typeof data === 'object' && data !== null) {
                dataArray = Object.values(data); // or transform as needed
            } else {
                throw new Error('Fetched data is not an array or object');
            }

            setResources(prevResources => {
                if (!Array.isArray(prevResources)) {
                    throw new Error('Previous resources is not an array');
                }
                    return Array.from(new Set([...prevResources, ...dataArray]));
                });
            })
            .catch(err => {
                console.error("Failed to fetch resources: ", err);
            });
    }, []);

    const iconMap = {
        "home": <GoHome />,
        "users": <FiUsers />,
        "clients": <RiUserStarLine />,
        "orders": <AiOutlineShoppingCart />
    };

    return (
        <div className={Styles.menu}>
            <span className={Styles.title}>Collections</span>
            {resources.filter(resource => ['home', 'users', 'clients', 'orders'].includes(resource)).map((resource, index) => (
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
