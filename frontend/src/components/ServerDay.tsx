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

interface ServerDayProps extends PickersDayProps<Dayjs> {
}

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

  const hasToDo = todos.some(
    (todo: ToDoItem) =>
      dayjs(todo.date).isSame(dayJs, "day") && todo.completed == false
  );
  const reminder = reminders.find((reminder: RemindersItem) =>
    dayjs(reminder.date).isSame(dayJs, "day")
  );
  const note = notes.find((note: NoteItem) =>
    dayjs(note.date).isSame(dayJs, "day")
  );
  const startTask = tasks.find(
    (task: TaskItem) =>
      task.start_date && dayjs(task.start_date).isSame(dayJs, "day") && task.is_finished==false
  );
  const endTask = tasks.find(
    (task: TaskItem) =>
      task.end_date &&
      dayjs(task.end_date).isSame(dayJs, "day") &&
      task.is_finished == false
  );
  const reminderEmoji = reminder
    ? categoryEmojis[reminder.category]
    : undefined;

  let badgeContent: string | undefined;
  if (hasToDo) {
    badgeContent = "✓";
  } else if (reminderEmoji) {
    badgeContent = reminderEmoji;
  } else if (startTask) {
    badgeContent = "🔜";
  } else if (endTask) {
    badgeContent = "🔚"; 
  } else if (note) {
    badgeContent = "📝";
  }

  const badgeColor = hasToDo ? "primary" : reminder ? "secondary" : "default";

  return (
    <Badge overlap="circular" badgeContent={badgeContent} color={badgeColor}>
      <PickersDay {...other} day={day} />
    </Badge>
  );
};

export default ServerDay;
