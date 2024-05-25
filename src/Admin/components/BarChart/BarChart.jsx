import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { NODE_API_ENDPOINT } from '../../../utils/utils';

const PlanSubscriptionBarChart = () => {
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
      const planCounts = orders.reduce((acc, order) => {
        const { plan } = order;
        acc[plan] = (acc[plan] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(planCounts),
        datasets: [{
          label: 'Number of Subscriptions per Plan',
          data: Object.values(planCounts),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }]
      });
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Subscription Count by Plan</h2>
      <Bar data={chartData} options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }} />
    </div>
  );
};

export default PlanSubscriptionBarChart;
