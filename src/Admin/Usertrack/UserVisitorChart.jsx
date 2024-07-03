import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const UserVisitorChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (data) {
      renderChart();
    }
    // Cleanup when component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  const renderChart = () => {
    const pathToPageName = {
      "/blog": "Blog Page",
      "/news": "News Page",
      "/case/search": "Case Search Page",
      "/gpt/legalGPT": "Legal GPT Page",
    };

    // Function to translate path to page name
    const getPageNameFromPath = (path) => {
      return pathToPageName[path] || "Unknown Page";
    };

    if (chartInstance) {
      chartInstance.destroy();
    }

    const labels = data.map((item) => getPageNameFromPath(item.path));

    // Initialize arrays for user and visitor data
    let userVisits = [];
    let userDurations = [];
    let visitorVisits = [];
    let visitorDurations = [];
    data.forEach((item) => {
      const totalUserVisits = item.visits
        .filter((visit) => visit.isUser)
        .reduce((total, visit) => total + visit.totalVisits, 0);
      const totalUserDuration = item.visits
        .filter((visit) => visit.isUser)
        .reduce((total, visit) => total + visit.totalDuration, 0);

      const totalVisitorVisits = item.visits
        .filter((visit) => !visit.isUser)
        .reduce((total, visit) => total + visit.totalVisits, 0);
      const totalVisitorDuration = item.visits
        .filter((visit) => !visit.isUser)
        .reduce((total, visit) => total + visit.totalDuration, 0);

      userVisits.push(totalUserVisits);
      userDurations.push(totalUserDuration);

      visitorVisits.push(totalVisitorVisits);
      visitorDurations.push(totalVisitorDuration);
    });

    const ctx = chartRef.current;

    setChartInstance(
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Users",
              data: userVisits,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Visitors",
              data: visitorVisits,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "User Duration (s)",
              data: userDurations.map((duration) => duration / 1000), // Convert milliseconds to seconds
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              type: "bar",

              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              yAxisID: "duration",
            },
            {
              label: "Visitor Duration (s)",
              data: visitorDurations.map((duration) => duration / 1000), // Convert milliseconds to seconds
              type: "bar",
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 2,
              yAxisID: "duration",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Count",
              },
            },
            duration: {
              position: "right",
              beginAtZero: true,
              title: {
                display: true,
                text: "Duration (s)",
              },
            },
          },
        },
      })
    );
  };

  return (
    <div
      style={{
        width: "800px",
        margin: "auto",
        position: "absolute",
        height: "300px",
      }}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default UserVisitorChart;
