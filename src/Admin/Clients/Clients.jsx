import React, { useState, useEffect } from 'react';
import { NODE_API_ENDPOINT } from '../../utils/utils';
import Styles from './Clients.module.css'
import DataTable from '../components/DataTable/DataTable';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'firstName', headerName: 'First name', width: 100, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA')},
  { field: 'lastName', headerName: 'Last name', width: 100, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'email', headerName: 'Email', width: 120, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'state', headerName: 'State', width: 80, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'city', headerName: 'City', width: 150, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150, editable: true },
  { field: 'ambassador', headerName: 'Ambassador', width: 120 , editable: true,
    valueGetter: (params) => (params.value ? '✅' : '❌')
    },
  { field: 'collegeName', headerName: 'College Name', width: 200,
  valueGetter: (params) => (params.value ? params.value : 'NA')
},
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

export default function Clients() {

  const [clients, setClients] = useState([]);
  
    useEffect(() => {
      const fetchclients = async () => {
        try {
          const response = await fetch(`${NODE_API_ENDPOINT}/admin/clients`);
          if (!response.ok) {
            throw new Error('Failed to fetch clients');
          }
          const data = await response.json();
          setClients(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
  
      fetchclients();
    }, []);
  
    const rows = clients.map((client, index) => ({
      id: index + 1,
      ...client,
    }));

  return (
    <div className="clients">
      <div className={Styles.info}>
        <h1>Clients</h1>
      </div>
      <DataTable slug="clients" columns={columns} rows={rows}/>
    </div>
  )
}