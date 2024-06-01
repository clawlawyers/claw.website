import React, { useState, useEffect } from 'react';
import { NODE_API_ENDPOINT } from '../../utils/utils';
import Styles from './SubscribedUser.module.css';
import DataTable from '../components/DataTable/DataTable';

const columns = [
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
  { field: 'planName', headerName: 'Plan Name', width: 120 },
  { field: 'tokenUsed', headerName: 'Tokens Used', width: 120 },
  { field: 'createdAt', headerName: 'Created At', width: 120, 
    valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
  { field: 'updatedAt', headerName: 'Updated At', width: 120, 
    valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
];

export default function SubscribedUser() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${NODE_API_ENDPOINT}/admin/subscribed-user`);
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const dataObject = await response.json();
        
        console.log('Fetched data:', dataObject);

        const dataArray = Object.values(dataObject);
        setClients(dataArray);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchClients();
  }, []);

  const rows = clients.map((client, index) => ({
    id: index + 1,
    ...client,
  }));

  console.log('Rows:', rows);

  return (
    <div className="clients">
      <div className={Styles.info}>
        <h1>Subscribed Users</h1>
      </div>
      {clients.length > 0 && <DataTable slug="clients" columns={columns} rows={rows} />}
    </div>
  );
}
