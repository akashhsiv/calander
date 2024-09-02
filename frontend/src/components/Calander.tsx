// CalendarWithEvents.tsx
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";
import ServerDay from './ServerDay';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { setSelectedDate } from "./features/core/coreSlice";
import { calendarStyle } from "./Constants";
import { CircularProgress } from "@mui/material";
// import dayjs  from 'dayjs';



const CalendarWithEvents: React.FC = () => {

    const selectedDate = useSelector(
      (state: RootState) => state.core.selectedDate
    );
     const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleMonthChange = (date: Dayjs) => {
    setIsLoading(true);
    console.log("Month changed to:", date);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{
        calendarWeekNumberHeaderText: "week no",
        calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
      }}
    >
      <DateCalendar
        value={selectedDate}
        onChange={(newValue) =>   dispatch(setSelectedDate(newValue))}
        sx={calendarStyle}
        views={["year", "month", "day"]}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => (
          <CircularProgress 
          />
        )}
        slots={{
          day: (dayProps) => (
            <ServerDay
              {...dayProps}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
};

export default CalendarWithEvents;
