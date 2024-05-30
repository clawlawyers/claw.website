import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';  // Import this to ensure that charts render automatically
import { NODE_API_ENDPOINT } from '../../../utils/utils';

const PieChart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${NODE_API_ENDPOINT}/admin/clients`);
      const clients = await response.json();
      processChartData(clients);
    };

    const processChartData = (clients) => {
      let trueCount = 0;
      let falseCount = 0;

      clients.forEach(client => {
        if (client.ambassador) {
          trueCount++;
        } else {
          falseCount++;
        }
      });

      setChartData({
        labels: ['Ambassador', 'Not Ambassador'],
        datasets: [
          {
            data: [trueCount, falseCount],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
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
      <h2>Ambassador Status Pie Chart</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
