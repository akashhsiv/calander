import { createSlice } from "@reduxjs/toolkit";
import { RemindersItem } from "./remindersTypes";
import { addReminders, deleteReminders, fetchReminders, updateReminders } from "./remindersActions";

// Define the state type
interface RemindersState {
  reminders: RemindersItem[];
}

// Initialize state with Reminderss array
const initialState: RemindersState = {
  reminders: [],
};

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReminders.fulfilled, (state, action) => {
        state.reminders = action.payload;
      })
      .addCase(addReminders.fulfilled, (state, action) => {
        state.reminders.push(action.payload);
      })
      .addCase(updateReminders.fulfilled, (state, action) => {
        const index = state.reminders.findIndex(
          (reminder) => reminder.id === action.payload.id
        );
        if (index !== -1) {
          state.reminders[index] = action.payload;
        }
      })
      .addCase(deleteReminders.fulfilled, (state, action) => {
        state.reminders = state.reminders.filter((reminder) => reminder.id !== action.payload);
      });
  },
});

export default remindersSlice.reducer;
