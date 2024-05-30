import React, { useState, useEffect } from 'react';
import { NODE_API_ENDPOINT } from '../../../utils/utils';
import Styles from './TopUsers.module.css'

export default function TopUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchtopUsers = async () => {
          try {
            const response = await fetch(`${NODE_API_ENDPOINT}/admin/topusers`);
            if (!response.ok) {
              throw new Error('Failed to fetch orders');
            }
            const users = await response.json();
            const usersWithTotalSessions = users.map(user => ({
                ...user,
                totalSessions: user.sessions.length,
              }));
            setUsers(usersWithTotalSessions);
          } catch (error) {
            console.error('Fetch error:', error);
          }
        };
    
        fetchtopUsers();
      }, []);

    return (
        <div className={Styles.topBox}>
            <h1>Top Users</h1>
            <div className={Styles.list}>
                {users.map((user, index) => (
                    <div className={Styles.listItem} key={user._id || index}>
                        <div className={Styles.user}>
                            <div className={Styles.userTexts}>
                                <span className={Styles.username}>{user.phoneNumber}</span>
                                <span className={Styles.email}>{user.planName}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
