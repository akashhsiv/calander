// tasksSlice.ts (or your relevant slice file)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

interface AuthState {
  username: string | null;
  userId: number | null;
}

interface CoreState {
  selectedDate: Dayjs | null;
  themeMode: 'light' | 'dark',
  auth: AuthState;
}

const initialState: CoreState = {
  selectedDate: null,
  themeMode: "light",
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
    setThemeMode(state, action: PayloadAction<"light" | "dark">) {
      state.themeMode = action.payload;
    },
    setUsername(state, action: PayloadAction<string | null>) {
      state.auth.username = action.payload;
    },
    setUserId(state, action: PayloadAction<number | null>) {
      state.auth.userId = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetState(_state) {
      // Reset to initial state
      return initialState;
    },
  },
});

export const { setSelectedDate, setThemeMode, setUsername, setUserId, resetState } =
  CoreSlice.actions;

export default CoreSlice.reducer;
