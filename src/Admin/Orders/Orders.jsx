import React, { useState, useEffect } from 'react';
import { NODE_API_ENDPOINT } from '../../utils/utils';
import Styles from './Orders.module.css'
import DataTable from '../components/DataTable/DataTable';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'user', headerName: 'User', width: 200, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA')},
  { field: 'paymentStatus', headerName: 'Payment Status', width: 150, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'plan', headerName: 'Plan', width: 150, editable: true , 
  valueFormatter: (params) => (params.value === 'male' ? 'M' : 'F')},
  { field: 'request', headerName: 'Request', width: 120, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'session', headerName: 'Session', width: 120, editable: true ,
  valueGetter: (params) => (params.value ? params.value : 'NA')},
  { field: 'billingCycle', headerName: 'Billing Cycle', width: 150, editable: true,
  valueGetter: (params) => (params.value ? params.value : 'NA') },
  { field: 'createdAt', headerName: 'Created At', width: 120, editable: true,
  valueFormatter: (params) => new Date(params.value).toLocaleDateString()
},
  { field: 'updatedAt', headerName: 'Updated At', width: 120, editable: true,
  valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
];

export default function Orders() {

  const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      const fetchorders = async () => {
        try {
          const response = await fetch(`${NODE_API_ENDPOINT}/admin/orders`);
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
  
      fetchorders();
    }, []);
  
    const rows = orders.map((user, index) => ({
      id: index + 1,
      ...user,
    }));

  return (
    <div className="orders">
      <div className={Styles.info}>
        <h1>Orders</h1>
      </div>
      <DataTable slug="orders" columns={columns} rows={rows}/>
    </div>
  )
}