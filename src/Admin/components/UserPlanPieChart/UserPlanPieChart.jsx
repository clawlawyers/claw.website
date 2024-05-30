import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { NODE_API_ENDPOINT } from '../../../utils/utils';

const UserPlanPieChart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${NODE_API_ENDPOINT}/admin/user`);
        const users = await response.json();

        if (!Array.isArray(users)) {
          console.error('Invalid data format: users is not an array', users);
          return;
        }

        processChartData(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const processChartData = (users) => {
      const planCounts = {};

      users.forEach(user => {
        if (planCounts[user.planName]) {
          planCounts[user.planName]++;
        } else {
          planCounts[user.planName] = 1;
        }
      });

      const labels = Object.keys(planCounts);
      const data = Object.values(planCounts);

      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#7FFFD4','#000'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#7FFFD4', '#000'],
          }
        ]
      });

      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User Plan Distribution Pie Chart</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default UserPlanPieChart;
