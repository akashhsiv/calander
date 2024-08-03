// ServerDay.tsx
import * as React from "react";
import { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { ToDoItem } from "./ToDo";
import { RemindersItem } from "./Reminder";
import { NoteItem } from "./Notes"; // Import NoteItem

// Define the Task interface
interface Task {
  title: string;
  description: string;
  startDate: Dayjs | null;
  finishDate: Dayjs | null;
  isFinished: boolean;
}

interface ServerDayProps extends PickersDayProps<Dayjs> {
  todos: ToDoItem[];
  reminders: RemindersItem[];
  tasks: Task[];
  notes: NoteItem[]; // Add notes prop
}

const categoryEmojis: Record<string, string> = {
  Birthday: "🎉",
  Interview: "💼",
  Meeting: "📅",
  Bill: "💰",
  Event: "🎟️",
};

const ServerDay: React.FC<ServerDayProps> = (props) => {
  const { day, todos, reminders, tasks, notes, ...other } = props; // Destructure notes

  // Check if there are To-Dos for this day
  const hasToDo = todos.some((todo) => todo.date.isSame(day, "day"));

  // Find the first reminder for this day to determine the emoji
  const reminder = reminders.find((reminder) =>
    reminder.date.isSame(day, "day")
  );
  const reminderEmoji = reminder
    ? categoryEmojis[reminder.category]
    : undefined;

  // Check if there are tasks starting or ending on this day
  const startTask = tasks.some((task) => task.startDate?.isSame(day, "day"));
  const endTask = tasks.some((task) => task.finishDate?.isSame(day, "day"));

  // Find the first note for this day to determine the emoji
  const note = notes.find((note) => note.date.isSame(day, "day"));
  const noteEmoji = note ? note.emoji : undefined;

  // Determine the badge content
  let badgeContent: string | undefined;
  if (hasToDo) {
    badgeContent = "✓";
  } else if (reminderEmoji) {
    badgeContent = reminderEmoji;
  } else if (startTask) {
    badgeContent = "🔜"; // Emoji for task starting
  } else if (endTask) {
    badgeContent = "🔚"; // Emoji for task ending
  } else if (noteEmoji) {
    badgeContent = noteEmoji;
  }

  return (
    <Badge
      overlap="circular"
      badgeContent={badgeContent}
      color={hasToDo ? "primary" : reminder ? "secondary" : "default"}
    >
      <PickersDay {...other} day={day} />
    </Badge>
  );
};

export default ServerDay;
