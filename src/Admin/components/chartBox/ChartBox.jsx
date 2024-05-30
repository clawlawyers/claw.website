import React, { useState, useEffect } from 'react';
import { NODE_API_ENDPOINT } from '../../../utils/utils';
import Styles from './ChartBox.module.css'
import { Link } from 'react-router-dom';
import { RiUserStarLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function ChartBox({ collectionName }) {
  const iconMap = {
      "users": <FiUsers />,
      "subscribed-users": <RiUserStarLine />,
      "referral-code": <AiOutlineShoppingCart />
  };

  const [collectionLength, setCollectionLength] = useState(0);
  let endpoint = '';
  async function fetchCollectionData() {
      if (collectionName === 'users') {
          endpoint = 'user';
      } else if (collectionName === 'subscribed-users') {
          endpoint = 'subscribed-user';
      } else if (collectionName === 'referral-code') {
          endpoint = 'referralcode';
      }

      try {
          const response = await fetch(`${NODE_API_ENDPOINT}/admin/${endpoint}`);
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
          </div>
      </div>
  );
}
