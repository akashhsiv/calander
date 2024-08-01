import { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

// Define interfaces for ToDo, Task, and Reminder
interface ToDo {
  title: string;
  date: Dayjs;
  completed: boolean;
}

interface Reminder {
  title: string;
  date: Dayjs;
  category: string; // e.g., "Birthday", "Meeting"
}

interface Task {
  title: string;
  description: string;
  startDate: Dayjs | null;
  finishDate: Dayjs | null;
  isFinished: boolean;
}

// Define props for the ServerDay component
interface ServerDayProps extends PickersDayProps<Dayjs> {
  todos?: ToDo[];
  tasks?: Task[];
  reminders?: Reminder[];
}

// Define the ServerDay component to display badges for ToDos, Tasks, and Reminders
function ServerDay(props: ServerDayProps) {
  const {
    todos = [],
    tasks = [],
    reminders = [],
    day,
    outsideCurrentMonth,
    ...other
  } = props;

  // Check if there are to-dos, tasks, or reminders for the current day
  const hasToDos = todos.some((todo) => day.isSame(todo.date, "day"));
  const taskSymbols = tasks
    .filter((task) => task.startDate && day.isSame(task.startDate, "day"))
    .map((task) => (task.isFinished ? "✅" : "🗂️"))
    .join("");
  const reminderSymbols = reminders
    .filter((reminder) => day.isSame(reminder.date, "day"))
    .map((reminder) => {
      switch (reminder.category) {
        case "Birthday":
          return "🎉";
        case "Interview":
          return "💼";
        case "Meeting":
          return "📅";
        case "Bill":
          return "💰";
        case "Event":
          return "🎟️";
        default:
          return "";
      }
    })
    .join("");

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        hasToDos || taskSymbols || reminderSymbols ? (
          <>
            {hasToDos ? "✅" : ""}
            {taskSymbols}
            {reminderSymbols}
          </>
        ) : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default ServerDay;
