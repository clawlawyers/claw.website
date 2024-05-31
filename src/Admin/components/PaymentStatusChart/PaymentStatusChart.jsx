import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { NODE_API_ENDPOINT } from '../../../utils/utils';
import 'chart.js/auto';

const PaymentDistributionStackedBarChart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${NODE_API_ENDPOINT}/admin/orders`);
      const orders = await response.json();
      processChartData(orders);
    };

    const processChartData = (orders) => {
      const plans = [...new Set(orders.map(order => order.plan))];
      const paymentStatuses = [...new Set(orders.map(order => order.paymentStatus))];

      const data = plans.map(plan => ({
        plan,
        ...paymentStatuses.reduce((acc, status) => {
          acc[status] = orders.filter(order => order.plan === plan && order.paymentStatus === status).length;
          return acc;
        }, {})
      }));

      const datasets = paymentStatuses.map((status, index) => ({
        label: status,
        data: data.map(d => d[status]),
        backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.5)`, // Dynamic colors for each status
        borderColor: `hsla(${index * 60}, 70%, 40%, 1)`,
        borderWidth: 1,
      }));

      setChartData({
        labels: plans,
        datasets: datasets
      });
    };

    fetchOrders();
  }, []);

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  return (
    <div>
      <h2>Payment Status Distribution by Plan</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PaymentDistributionStackedBarChart;
