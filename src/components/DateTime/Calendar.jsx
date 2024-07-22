import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TimePickerValue from "./Clock"; // Assuming you have a separate TimePickerValue component
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSelectedTime } from "../../features/bookCourtRoom/selectedDatesTimesSlice";
import "./DateTime.module.css"
const Container = styled.div`
  background: linear-gradient(100deg, #008080 0%, #15b3b3 100%);
  border-radius: 5px;
  border: 2px solid white;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
  width: 60%;
  max-width: 570px;
  max-height: 60vh;
  font-weight: 900;
  color: white;
  box-shadow: 2px 4px 10px black; // Added drop shadow

  @media (max-width: 768px) {
    height: 90vw;
    width: 90vw;
  }

  @media (max-width: 480px) {
    height: 100vw;
    width: 100vw;
    padding: 10px;
  }
`;

const ScaledCalendar = styled.div`

  transform: scale(1.7);
  font-weight:900;
  color:white;
  transform-origin: center;

  @media (max-width: 768px) {
    transform: scale(1);
  }

  @media (max-width: 480px) {
    transform: scale(0.8);
  }
`;

const CalendarComponent = ({scheduledSlots,setScheduledSlots}) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  
  const dispatch = useDispatch();

  const minDate = dayjs().startOf("month");
  const maxDate = dayjs().add(1, "month").endOf("month");

  const handleDateChange = (date) => {
    // Dispatch action to add selected date to Redux store
    setSelectedDates([...selectedDates, date]);
    setSelectedTimes([]); // Reset selected times when date changes
    dispatch(addSelectedTime({ date: date.format("YYYY-MM-DD"), time: null }));
  };

  const addSlot = () => {
    // Dispatch action to add selected date and time to Redux store
    const newSlot = {
      date: selectedDates[selectedDates.length - 1],
      time: selectedTimes,
    };
    setScheduledSlots([...scheduledSlots, newSlot]);
    setSelectedTimes([]); // Clear selected times after adding
    dispatch(addSelectedTime(newSlot));

    
  };

  return (
    <main
    className="flex w-full flex-col justify-center items-center gap-[70px]"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section
          className="flex w-full flex-row justify-center items-center gap-[70px]  h-[70vh]"
        >
          <Container>
           
              <DateCalendar
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                shouldDisableDate={(date) =>
                  dayjs(date).isBefore(dayjs(), "day")
                }
                views={["day",]}
                sx={{
                  color:"white",
                  marginTop:"50px",
                  transform: "scale(1.7)",
                  transformOrigin:"center"
                }}
              />
            
          </Container>
          <div className="border-2 border-white p-1 rounded-md bg-gradient-to-r from-teal-600 to-cyan-500">
            <h3 className="text-[1.2rem] p-1 text-center font-semibold">Select Time:</h3>
            <TimePickerValue
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
            />
          </div>
        </section>
        <div
         className="flex flex-col gap-5 w-full justify-center items-center"
        >
          <Button
            className="w-1/12"
            variant="contained"
            color="primary"
            onClick={addSlot}
          >
            Add to Slot
          </Button>
          <div
            style={{
              backgroundColor: "#000000a6",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: "60px",
            }}
          >
            <h3>Scheduled Slots:</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                border: "3px solid  teal",
                backgroundColor:"white",
                width: "70%",
                height: "80px",
                padding: "10px",
                borderRadius: "5px",
                gap:"20px",
              }}
            >
              {scheduledSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex flex-row p-2 w-fit h-max  rounded-lg font-semibold bg-gradient-to-r from-teal-800 to-teal-400 text-white gap-5 my-2"
                >
                  {new Date(slot.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                  })}
                  {","}
                  {slot.time}
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </main>
  );
};

export default CalendarComponent;
