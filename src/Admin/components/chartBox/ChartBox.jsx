import React, { useState, useEffect } from 'react';
import { NODE_API_ENDPOINT } from '../../../utils/utils';
import Styles from './ChartBox.module.css';
import { Link } from 'react-router-dom';
import { RiUserStarLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import fetchWrapper from '../../../utils/fetchWrapper';

export default function ChartBox({ collectionName }) {
  const iconMap = {
      "users": <FiUsers />,
      "subscribed-users": <RiUserStarLine />,
      "referral-code": <AiOutlineShoppingCart />,
      "visitors": <FiUsers /> // Assuming visitors use the same icon as users
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
      } else if (collectionName === 'visitors') {
          endpoint = 'user'; // Assuming visitors data comes from the 'user' endpoint
      }

      try {
        //   const response = await fetch(`${NODE_API_ENDPOINT}/admin/${endpoint}`);
          const response = await fetchWrapper.get(`${NODE_API_ENDPOINT}/admin/${endpoint}`);
          const data = await response.json();
          
          // Filtering logic for users and visitors
          if (collectionName === 'users') {
              const filteredData = data.filter(user => user.tokenUsed !== 0);
              setCollectionLength(filteredData.length);
          } else if (collectionName === 'visitors') {
              const filteredData = data.filter(user => user.tokenUsed === 0);
              setCollectionLength(filteredData.length);
          } else {
              setCollectionLength(data.length);
          }
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
