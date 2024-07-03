import React, { useState, useEffect } from "react";
// import formatDuration from "./formatDuration";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import UserVisitorChart from "./UserVisitorChart";

const Usertrack = () => {
  const [viewType, setViewType] = useState("dailyuserpagevisit");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(viewType);
  }, [viewType]);

  const fetchData = async (type) => {
    const response = await fetch(`${NODE_API_ENDPOINT}/admin/${type}`);
    const result = await response.json();
    setData(result);
  };

  const handleViewChange = (type) => {
    setViewType(type);
  };

  const formatDuration = (duration) => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const renderData = (data) => {
    if (!data) return <p>Loading...</p>;

    return data.map((item, index) => (
      <div key={index}>
        <p>
          <strong>Path:</strong> {item.path}
        </p>
        <div style={{ marginLeft: "20px" }}>
          <h4>User Data:</h4>
          {item.visits
            .filter((visit) => visit.isUser)
            .map((visit, i) => (
              <div key={i}>
                <p>
                  <strong>Total Visits:</strong> {visit.totalVisits}
                </p>
                <p>
                  <strong>Total Engagement Time:</strong>{" "}
                  {formatDuration(visit.totalDuration)}
                </p>
              </div>
            ))}
        </div>
        <div style={{ marginLeft: "20px" }}>
          <h4>Visitor Data:</h4>
          {item.visits
            .filter((visit) => !visit.isUser)
            .map((visit, i) => (
              <div key={i}>
                <p>
                  <strong>Total Visits:</strong> {visit.totalVisits}
                </p>
                <p>
                  <strong>Total Engagement Time:</strong>{" "}
                  {formatDuration(visit.totalDuration)}
                </p>
              </div>
            ))}
        </div>
      </div>
    ));
  };

  return (
    <div style={{ position: "absolute" }}>
      <h1>Admin Dashboard</h1>
      <div>
        <button onClick={() => handleViewChange("dailyuserpagevisit")}>
          Daily
        </button>
        <button onClick={() => handleViewChange("monthlyuserpagevisit")}>
          Monthly
        </button>
        <button onClick={() => handleViewChange("yearlyuserpagevisit")}>
          Yearly
        </button>
      </div>
      <h2>{viewType.charAt(0).toUpperCase() + viewType.slice(1)} Data</h2>
      <UserVisitorChart data={data} />
    </div>
  );
};

export default Usertrack;
