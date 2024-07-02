import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TestCalendar = () => {
  const [date, setDate] = useState(new Date());

  // Hardcoded example data for testing
  const calendarData = [
    { date: "2024-06-27", enrolled: 10, dropped: 2 },
    { date: "2024-06-28", enrolled: 8, dropped: 1 },
    // Add more data as needed
  ];

  const renderCalendarTile = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const dayData = calendarData.find((d) => d.date === dateString);
      if (dayData) {
        return (
          <div>
            <div>Enrolled: {dayData.enrolled}</div>
            <div>Dropped: {dayData.dropped}</div>
          </div>
        );
      }
    }
    return null; // Only return null if no data for the date
  };

  return (
    <div>
      <h2>Test Calendar</h2>
      <Calendar
        value={date}
        onChange={setDate}
        tileContent={renderCalendarTile}
      />
    </div>
  );
};

export default TestCalendar;
