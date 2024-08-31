import * as React from "react";
import { Grid } from "@mui/material";
import { Dayjs } from "dayjs";
import ToDos, { ToDoItem } from "./components/ToDo";
import Reminders, { RemindersItem } from "./components/Reminder";
import Tasks, { TaskItem } from "./components/Tasks";
import Notes, { NoteItem } from "./components/Notes"; // Ensure correct import path
import "./components/index.css"; // Ensure correct import path
import CalendarWithEvents from './components/Calander';

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [todos, setTodos] = React.useState<ToDoItem[]>([]);
  const [reminders, setReminders] = React.useState<RemindersItem[]>([]);
  const [tasks, setTasks] = React.useState<TaskItem[]>([]);
  const [notes, setNotes] = React.useState<NoteItem[]>([]);

  const addTask = (task: TaskItem) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addNote = (note: NoteItem) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "15px" }}>
      <Grid item xs={12} md={7}>
        <CalendarWithEvents
          selecteddate={selectedDate}
          setselecteddate={setSelectedDate}
          todos={todos}
          reminders={reminders}
          tasks={tasks}
          notes={notes}
        />
        <Tasks
          selectedDate={selectedDate}
          tasks={tasks}
          addTask={addTask}
          deleteTask={deleteTask}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Notes
          selectedDate={selectedDate}
          notes={notes}
          addNote={addNote}
          deleteNote={deleteNote}
        />
        <ToDos selecteddate={selectedDate} todos={todos} setTodos={setTodos} />
        <Reminders
          selecteddate={selectedDate}
          reminders={reminders}
          setReminders={setReminders}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
