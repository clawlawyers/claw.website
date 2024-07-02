// client/src/pages/SalesmanDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "react-calendar/dist/Calendar.css";

import { NODE_API_ENDPOINT } from "../../utils/utils";

const SalesmanDetail = () => {
  const { id } = useParams();
  const [salesman, setSalesman] = useState(null);
  const [value, onChange] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [yearlyGraphData, setYearlyGraphData] = useState([]);
  const [view, setView] = useState("monthly");

  useEffect(() => {
    axios
      .get(`${NODE_API_ENDPOINT}/salesman/${id}`)
      .then((response) => {
        setSalesman(response.data);
        processUserData(response.data.enrolledUsers);
      })
      .catch((error) => console.error("Error fetching salesman:", error));
  }, [id]);

  const processUserData = (users) => {
    const calendar = {};
    const graph = {};
    const yearlyGraph = {};

    users.forEach((user) => {
      // Ensure consistent date formatting
      const enrollDate = new Date(user.dateEnrolled).toLocaleDateString();

      const status = user.status;

      if (!calendar[enrollDate]) {
        calendar[enrollDate] = { enrolled: 0, dropped: 0 };
      }
      calendar[enrollDate].enrolled += 1;
      console.log(calendar[enrollDate]);

      const dropDate = new Date(user.dropDate).toLocaleDateString();
      const dDate = new Date(user.dropDate);

      if (status === "Dropped") {
        if (!calendar[dropDate] || undefined) {
          calendar[dropDate] = { enrolled: 0, dropped: 0 };
        }
        calendar[dropDate].dropped += 1;
        console.log(calendar[dropDate]);
      }
      const dropMonthYear = dDate
        ? dDate.toLocaleDateString("default", {
            month: "short",
            year: "numeric",
          })
        : null;

      //-----------------

      const monthYear = new Date(user.dateEnrolled).toLocaleDateString(
        "default",
        { month: "short", year: "numeric" }
      );
      if (!graph[monthYear]) {
        graph[monthYear] = {
          month: monthYear,
          enrolled: 0,
          dropped: 0,
          retained: 0,
        };
      }
      graph[monthYear].enrolled += 1;
      if (status === "Retained") {
        graph[monthYear].retained += 1;
      } else if (status === "Dropped" && dropMonthYear) {
        graph[dropMonthYear] = graph[dropMonthYear] || {
          month: dropMonthYear,
          enrolled: 0,
          dropped: 0,
          retained: 0,
        };
        graph[dropMonthYear].dropped += 1;
      }

      const year = new Date(user.dateEnrolled).getFullYear();
      if (!yearlyGraph[year]) {
        yearlyGraph[year] = {
          year: year,
          enrolled: 0,
          dropped: 0,
          retained: 0,
        };
      }
      yearlyGraph[year].enrolled += 1;
      if (status === "Retained") {
        yearlyGraph[year].retained += 1;
      } else if (status === "Dropped") {
        yearlyGraph[year].dropped += 1;
      }
    });

    setCalendarData(
      Object.entries(calendar).map(([date, data]) => ({ date, ...data }))
    );
    setGraphData(Object.values(graph));
    setYearlyGraphData(Object.values(yearlyGraph));
  };

  const renderCalendarTile = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toLocaleDateString();
      const dayData = calendarData.find((d) => d.date === dateString);
      if (dayData) {
        return (
          <div style={{ width: "20px" }}>
            <div>Enrolled: {dayData.enrolled}</div>
            <div>Dropped: {dayData.dropped}</div>
          </div>
        );
      }
    }
    return null;
  };

  if (!salesman) {
    return <div>Loading...</div>;
  }

  const toggleView = () => {
    setView(view === "monthly" ? "yearly" : "monthly");
  };

  return (
    <div>
      <h1>{salesman.name}</h1>
      <p>Referral Code: {salesman.referralCode}</p>
      <p>Location: {salesman.location}</p>
      <h2>Enrolled Users</h2>
      <ul>
        {salesman.enrolledUsers.map((user) => (
          <li key={user._id}>
            {user.phoneNumber} - {user.location}- {user.status}
          </li>
        ))}
      </ul>
      <h2>Calendar View</h2>
      <div style={{ color: "red", fontWeight: "bold" }}>
        <Calendar
          value={date}
          onChange={setDate}
          tileContent={renderCalendarTile}
          className="react-calendar"
        />
      </div>

      {/* <button onClick={onNextMonthClick}>Next Month</button> */}
      <button onClick={toggleView}>
        {view === "monthly" ? "View Yearly" : "View Monthly"}
      </button>
      <h2>{view === "monthly" ? "Monthly Overview" : "Yearly Overview"}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={view === "monthly" ? graphData : yearlyGraphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={view === "monthly" ? "month" : "year"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="enrolled"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="dropped" stroke="#82ca9d" />
          <Line type="monotone" dataKey="retained" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesmanDetail;
