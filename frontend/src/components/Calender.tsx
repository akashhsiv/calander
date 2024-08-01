import * as React from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import ServerDay from "./ServerDay"; // Import the ServerDay component

// Define interfaces for ToDo, Task, and Reminder
interface ToDo {
  title: string;
  date: Dayjs;
  completed: boolean;
}

interface Task {
  title: string;
  description: string;
  startDate: Dayjs | null;
  finishDate: Dayjs | null;
  isFinished: boolean;
}

interface Reminder {
  title: string;
  date: Dayjs;
  category: string; // e.g., "Birthday", "Meeting"
}

// Define props for the CalendarWithEvents component
interface CalendarWithEventsProps {
  selecteddate: Dayjs | null;
  setselecteddate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  todos: ToDo[];
  tasks: Task[];
  reminders: Reminder[];
}

const CalendarWithEvents: React.FC<CalendarWithEventsProps> = ({
  selecteddate,
  setselecteddate,
  todos,
  tasks,
  reminders,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleMonthChange = () => {
    setIsLoading(true);
    // Your logic to fetch highlighted days (e.g., API call)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        displayWeekNumber
        value={selecteddate}
        onChange={(newValue) => setselecteddate(newValue)}
        sx={{ height: "500px", width: "500px" }} // Adjust these values as needed
        views={["year", "month", "day"]}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: (dayProps) => (
            <ServerDay
              {...dayProps}
              todos={todos}
              tasks={tasks}
              reminders={reminders}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
};

export default CalendarWithEvents;
