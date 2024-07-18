import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSelectedTime } from "../../features/bookCourtRoom/selectedDatesTimesSlice";
import styled, { css, keyframes } from "styled-components";
export default function TimePickerValue({ selectedTimes, setSelectedTimes }) {
  // Generate an array of times with a one-hour gap
  const colorChange = keyframes`
  0% { background-color: transparent; }
  100% { background-color: lightblue; }
`;

  const Button = styled.button`
    color: black;
    padding: 10px 20px;
    border: 2px solid white;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;

    ${(props) =>
      props.isSelected &&
      css`
        animation: ${colorChange} 1s ease-in-out forwards;
      `}
  `;
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : i;
    return `${hour}:00`;
  });

  const [isAM, setIsAM] = useState(true);
  const dispatch = useDispatch();
  const handleTimeClick = (time) => {
    dispatch(addSelectedTime(time));

    setSelectedTimes((prevSelectedTimes) => {
      if (prevSelectedTimes.includes(time)) {
        return prevSelectedTimes.filter((t) => t !== time);
      } else {
        return [...prevSelectedTimes, time];
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "450px",
        overflowY: "scroll",
      }}
    >
      {times.map((time, index) => {
        const hour = parseInt(time.split(":")[0], 10);
        if (isAM ? hour < 12 : hour >= 12) {
          return (
            <Button
              key={index}
              onClick={() => handleTimeClick(time)}
              isSelected={selectedTimes.includes(time)}
            >
              {time}
            </Button>
          );
        }
        return null;
      })}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setIsAM(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: isAM ? "lightblue" : "white",
            color: "black",
            border: "2px solid white",
            borderRadius: "5px",
            cursor: "pointer",
            flex: 1,
            marginRight: "5px",
          }}
        >
          AM
        </button>
        <button
          onClick={() => setIsAM(false)}
          style={{
            padding: "10px 20px",
            backgroundColor: !isAM ? "lightblue" : "white",
            color: "black",
            border: "2px solid white",
            borderRadius: "5px",
            cursor: "pointer",
            flex: 1,
            marginLeft: "5px",
          }}
        >
          PM
        </button>
      </div>
    </div>
  );
}
