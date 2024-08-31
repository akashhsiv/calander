// CalendarWithEvents.tsx
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Dayjs } from "dayjs";
import ServerDay from './ServerDay';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { setSelectedDate } from "./features/core/coreSlice";



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
        sx={{
          height: "95%",
          maxHeight: "95%",
          width: "950px",
          bgcolor: "background.paper",
          boxShadow: "2",
          "& .MuiDayCalendar-slideTransition": {
            minHeight: "400px",
            fontSize: "1rem",
          },
          "&.MuiDayCalendar-monthContainer": {
            fontSize: "3rem",
            fontWeight: "bold",
          },

          "& .MuiDayCalendar-weekDayLabel": {
            fontWeight: "bold",
            fontSize: "1rem",
          },
          "& .MuiDayCalendar-header": {
            gap: "100px",
          },
          "& .MuiDayCalendar-weekContainer": {
            gap: "100px",
            pt: "30px",
            fontSize: "1rem",
            fontWeight: "bold",
          },
          "&. MuiPickersCalendarHeader-labelContainer": {
            fontSize: "3rem",
            fontWeight: "bold",
          },
        }}
        views={["year", "month", "day"]}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => (
          <DayCalendarSkeleton
            sx={{
              height: "1000px",
              maxHeight: "1000px",
              width: "950px",
              maxWidth: "950px",
              display: "inherit",
              flexDirection: "column",
            }}
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
