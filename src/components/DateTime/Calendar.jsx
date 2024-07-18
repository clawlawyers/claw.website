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

const Container = styled.div`
  background: linear-gradient(100deg, #008080 0%, #15b3b3 100%);
  border-radius: 5px;
  border: 2px solid white;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vw;
  width: 60%;
  max-width: 570px;
  max-height:550px;
  font-weight:800;
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
  font-weight:800;
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
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "70px",

      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "70px",
           

          }}
        >
          <Container>
            <ScaledCalendar>
              <DateCalendar
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                shouldDisableDate={(date) =>
                  dayjs(date).isBefore(dayjs(), "day")
                }
                views={["day",]}
              />
            </ScaledCalendar>
          </Container>
          <div style={{
            border:"2px solid white",
            padding:"5px",
            borderRadius:"7px",
            background: 'linear-gradient(100deg, #008080 0%, #15B3B3 100%)', 

          }}>
            <h3>Select Time:</h3>
            <TimePickerValue
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
            />
          </div>
        </section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              width: "10%",
            }}
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
              padding: "10px",
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
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "fit-content",
                    height: "max-content",
                    padding: "5px",
                    borderRadius: "4px",
                    background:
                      "linear-gradient(100deg, #008080 0%, #15b3b3 100%)",
                    color: "white",
                    gap: "20px",
                    margin: "10px 0", // Add vertical margin
                  }}
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
