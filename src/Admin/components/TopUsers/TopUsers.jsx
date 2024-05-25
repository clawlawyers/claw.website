import React, { useState, useEffect } from 'react';
import { NODE_API_ENDPOINT } from '../../../utils/utils';
import Styles from './TopUsers.module.css'

export default function TopUsers() {
    const [users, setUsers] = useState([]);
    const [topUsers, setTopUsers] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch(`${NODE_API_ENDPOINT}/admin/users`);
            const data = await response.json();
            setUsers(data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function filterUsers(users) {
        return users.filter(user => user.searchTagEmbedding && user.id_url);
    }

    function sortUsers(users) {
        return users.sort((a, b) => b.searchTagEmbedding.length - a.searchTagEmbedding.length);
    }

    useEffect(() => {
        fetchData().then(() => {
            const filteredUsers = filterUsers(users);
            const sortedUsers = sortUsers(filteredUsers);
            setTopUsers(sortedUsers.slice(0, 7));
        });
    }, [users]);

    return (
        <div className={Styles.topBox}>
            <h1>Top Users</h1>
            <div className={Styles.list}>
                {topUsers.map(user => (
                    <div className={Styles.listItem} key={user._id}>
                        <div className={Styles.user}>
                            <img src={user.id_url} alt={`${user.firstName}'s ID`} />
                            <div className={Styles.userTexts}>
                                <span className={Styles.username}>{user.firstName}</span>
                                <span className={Styles.email}>{user.email}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
