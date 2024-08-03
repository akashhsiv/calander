// CalendarWithEvents.tsx
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import ServerDay from "./ServerDay";
import { Dayjs } from "dayjs";
import { ToDoItem } from "./ToDo";
import { RemindersItem } from "./Reminder";
import { TaskItem } from "./Tasks"; // Import Task interface
import { NoteItem } from "./Notes"; // Import NoteItem

interface CalendarWithEventsProps {
  selecteddate: Dayjs | null;
  setselecteddate: (date: Dayjs | null) => void;
  todos: ToDoItem[];
  reminders: RemindersItem[];
  tasks: TaskItem[]; // Use Task interface for tasks
  notes: NoteItem[]; // Add notes prop
}

const CalendarWithEvents: React.FC<CalendarWithEventsProps> = ({
  selecteddate,
  setselecteddate,
  todos,
  reminders,
  tasks, // Destructure tasks
  notes, // Destructure notes
}) => {
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
        value={selecteddate}
        onChange={(newValue) => setselecteddate(newValue)}
        sx={{
          height: "100%",
          maxHeight: "100%",
          width: "800px",
          border: "1px solid",
          "& .MuiDayCalendar-slideTransition": {
            minHeight: "360px",
          },
          "& .MuiDayCalendar-weekDayLabel": {
            fontWeight: "bold",
            fontSize: "0.95rem",
          },
          "& .MuiDayCalendar-header": {
            gap: "70px",
          },
          "& .MuiDayCalendar-weekContainer": {
            gap: "70px",
            pt: "30px",
          },
        }}
        views={["year", "month", "day"]}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: (dayProps) => (
            <ServerDay
              {...dayProps}
              todos={todos}
              reminders={reminders}
              tasks={tasks} // Pass tasks
              notes={notes} // Pass notes
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
};

export default CalendarWithEvents;
