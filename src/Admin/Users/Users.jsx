import React, { useState, useEffect } from 'react';
import { NODE_API_ENDPOINT } from '../../utils/utils';
import Styles from './Users.module.css'
import DataTable from '../components/DataTable/DataTable';

const columns = [
  // { field: 'mongoId', headerName: 'Mongo ID', width: 200 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
  { field: 'planName', headerName: 'Plan Name', width: 120 },
  // { field: 'generatedReferralCodeId', headerName: 'Generated Referral Code ID', width: 200 },
  // { field: 'redeemedReferralCodeId', headerName: 'Redeemed Referral Code ID', width: 200 },
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
          setUsers(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    const rows = Object.keys(users).map((key, index) => ({
      id: index + 1,
      ...users[key],
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