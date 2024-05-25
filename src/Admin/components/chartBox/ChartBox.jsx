import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NODE_API_ENDPOINT } from '../../../utils/utils';
import { GoHome } from "react-icons/go";
import { RiUserStarLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Styles from "./ChartBox.module.css"

export default function ChartBox({ collectionName }) {

    const iconMap = {
        "blogs": <GoHome />,
        "users": <FiUsers />,
        "clients": <RiUserStarLine />,
        "orders": <AiOutlineShoppingCart />
    };

  const [collectionLength, setCollectionLength] = useState(0);

  async function fetchCollectionData() {
    try {
      const response = await fetch(`${NODE_API_ENDPOINT}/admin/${collectionName}`);
      const data = await response.json();
      setCollectionLength(data.length);
      return data;
    } catch (error) {
      console.error('Error fetching collection data:', error);
    }
  }

  useEffect(() => {
    if (collectionName) {
      fetchCollectionData();
    }
  }, [collectionName]);

  return (
    <div className={Styles.chartBox}>
      <div className={Styles.boxInfo}>
        <div className={Styles.title}>
        {iconMap[collectionName]}
          <span>Total {collectionName}</span>
        </div>
        <h1>{collectionLength}</h1>
        <Link to={`/admin/${collectionName}`}>
          View all
        </Link>
      </div>
    </div>
  );
}
