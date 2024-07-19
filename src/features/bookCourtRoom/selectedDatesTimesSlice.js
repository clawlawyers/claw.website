import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDates: [],
  selectedTimes: [],
  scheduledSlots: [],
};

const selectedDatesTimesSlice = createSlice({
  name: "selectedDatesTimes",
  initialState,
  reducers: {
    addSelectedDate(state, action) {
      state.selectedDates = [...state.selectedDates, action.payload]; // Add new date to array
    },
    addSelectedTime(state, action) {
      state.selectedTimes = [...state.selectedTimes, action.payload]; // Add new time to array
    },
    addScheduledSlot(state, action) {
      state.scheduledSlots = [...state.scheduledSlots, action.payload]; // Add new scheduled slot to array
    },
    clearSelectedDatesTimes(state) {
      state.selectedDates = [];
      state.selectedTimes = [];
      state.scheduledSlots = [];
    },
  },
});

export const {
  addSelectedDate,
  addSelectedTime,
  addScheduledSlot,
  clearSelectedDatesTimes,
} = selectedDatesTimesSlice.actions;

export default selectedDatesTimesSlice.reducer;
