// tasksSlice.ts (or your relevant slice file)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

interface AuthState {
  username: string | null;
  userId: number | null;
}

interface CoreState {
  selectedDate: Dayjs | null;
  auth: AuthState;
}

const initialState: CoreState = {
  selectedDate: null,
  auth: {
    username: null,
    userId: null,
  },
};

const CoreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<Dayjs | null>) {
      state.selectedDate = action.payload;
    },
    setUsername(state, action: PayloadAction<string | null>) {
      state.auth.username = action.payload;
    },
    setUserId(state, action: PayloadAction<number | null>) {
      state.auth.userId = action.payload;
    },
  },
});

export const { setSelectedDate, setUsername, setUserId } = CoreSlice.actions;

export default CoreSlice.reducer;
