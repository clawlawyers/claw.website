import React, { useState, useEffect } from 'react';
import { NODE_API_ENDPOINT } from '../../utils/utils';
import Styles from './Users.module.css'
import DataTable from '../components/DataTable/DataTable';

const columns = [
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
  { field: 'planName', headerName: 'Plan Name', width: 120 },
  { field: 'tokenUsed', headerName: 'Tokens Used', width: 120 },
  { field: 'createdAt', headerName: 'Created At', width: 200,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString()  },
  { field: 'updatedAt', headerName: 'Updated At', width: 200,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString()  },
];

export default function Users() {

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${NODE_API_ENDPOINT}/admin/user`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();

        // Filter users with tokenUsed not equal to zero
        const filteredUsers = data.filter(user => user.tokenUsed !== 0);

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchUsers();
  }, []);
  
  const rows = users.map((user, index) => ({
    id: index + 1,
    ...user,
  }));    

  return (
    <div className="users">
      <div className={Styles.info}>
        <h1>Users</h1>
      </div>
      <DataTable slug="users" columns={columns} rows={rows}/>
    </div>
  )
}
