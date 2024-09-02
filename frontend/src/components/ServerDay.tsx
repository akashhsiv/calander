import * as React from "react";
import Badge from "@mui/material/Badge";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { RemindersItem } from "./features/reminders/remindersTypes";
import { ToDoItem } from "./features/todos/todosTypes";
import { NoteItem } from "./features/notes/notesTypes";
import { TaskItem } from "./features/tasks/tasksTypes";

interface ServerDayProps extends PickersDayProps<Dayjs> {}

const categoryEmojis: Record<string, string> = {
  Birthday: "🎉",
  Interview: "💼",
  Meeting: "📅",
  Bill: "💰",
  Event: "🎟️",
};

const ServerDay: React.FC<ServerDayProps> = (props) => {
  const reminders = useSelector(
    (state: RootState) => state.reminders.reminders
  );
  const todos = useSelector((state: RootState) => state.todos.todos);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const { day, ...other } = props;
  const dayJs = dayjs(day);

  // Count items for the given day
  const todosCount = todos.filter(
    (todo: ToDoItem) => dayjs(todo.date).isSame(dayJs, "day") && !todo.completed
  ).length;
  const remindersCount = reminders.filter((reminder: RemindersItem) =>
    dayjs(reminder.date).isSame(dayJs, "day")
  ).length;
  const notesCount = notes.filter((note: NoteItem) =>
    dayjs(note.date).isSame(dayJs, "day")
  ).length;
  const startTaskCount = tasks.filter(
    (task: TaskItem) =>
      task.start_date &&
      dayjs(task.start_date).isSame(dayJs, "day") &&
      !task.is_finished
  ).length;
  const endTaskCount = tasks.filter(
    (task: TaskItem) =>
      task.end_date &&
      dayjs(task.end_date).isSame(dayJs, "day") &&
      !task.is_finished
  ).length;

  // Determine the badge content
  let badgeContent: string | undefined;
  const totalItems =
    todosCount + remindersCount + notesCount + startTaskCount + endTaskCount;

  if (totalItems > 1) {
    badgeContent = totalItems.toString();
  } else if (todosCount > 0) {
    badgeContent = "✓";
  } else if (remindersCount > 0) {
    badgeContent = categoryEmojis[reminders[0].category] || "!";
  } else if (startTaskCount > 0) {
    badgeContent = "🚨";
  } else if (endTaskCount > 0) {
    badgeContent = "🏁";
  } else if (notesCount > 0) {
    badgeContent = "📝";
  }

  // Define colors for the badge based on the type of content
  const badgeColor =
    totalItems > 1 ? "error" : remindersCount > 0 ? "secondary" : "primary";

  return (
    <Badge
      overlap="circular"
      badgeContent={badgeContent}
      color={badgeColor}
      sx={{
      }}
    >
      <PickersDay {...other} day={day} />
    </Badge>
  );
};

export default ServerDay;
