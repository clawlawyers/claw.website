import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { NODE_API_ENDPOINT } from '../../utils/utils';
import Styles from './Users.module.css'
import DataTable from '../components/DataTable/DataTable';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'firstName', headerName: 'First name', width: 100, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA')},
  { field: 'lastName', headerName: 'Last name', width: 100, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'gender', headerName: 'Gender', width: 80, editable: true , 
  valueFormatter: (params) => (params.value === 'male' ? 'M' : 'F')},
  { field: 'email', headerName: 'Email', width: 120, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'barCouncilId', headerName: 'Bar Council ID', width: 140, editable: true ,
  valueGetter: (params) => (params.value ? params.value : 'NA')},
  { field: 'barCouncilNo', headerName: 'Bar Council No', width: 130, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'barCouncilYear', headerName: 'Bar Council Year', width: 150, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'state', headerName: 'State', width: 80, editable: true ,
  valueGetter: (params) => (params.value ? params.value : 'NA')},
  { field: 'city', headerName: 'City', width: 150, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'pincode', headerName: 'Pincode', width: 100, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'searchTag', headerName: 'Search Tag', width: 150, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'id_url', headerName: 'Avatar', width: 50, editable: true,
  renderCell: (params) => <Avatar alt="Avatar" src={params.value} sx={{ width: 32, height: 32 }} />},
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150, editable: true },
  { field: 'verified', headerName: 'Verified', width: 80, editable: true,
        valueGetter: (params) => (params.value ? '✅' : '❌')
    },
  { field: 'registered', headerName: 'Registered', width: 100, editable: true ,
    valueGetter: (params) => (params.value ? '✅' : '❌')
    },
  { field: 'createdAt', headerName: 'Created At', width: 120, editable: true,
  valueFormatter: (params) => new Date(params.value).toLocaleDateString()
},
  { field: 'updatedAt', headerName: 'Updated At', width: 120, editable: true,
  valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
];

export default function Users() {

  const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`${NODE_API_ENDPOINT}/admin/users`);
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