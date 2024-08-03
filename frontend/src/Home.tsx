import * as React from "react";
import { Grid } from "@mui/material";
import CalendarWithEvents from "./components/Calander";
import { Dayjs } from "dayjs";
import ToDos, { ToDoItem } from "./components/ToDo";
import Reminders, { RemindersItem } from "./components/Reminder";
import Tasks, { TaskItem } from "./components/Tasks";
import Notes, { NoteItem } from "./components/Notes"; // Import Notes
import BottomAppBar from "./components/RespNavBar";
import "./components/index.css"

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [todos, setTodos] = React.useState<ToDoItem[]>([]);
  const [reminders, setReminders] = React.useState<RemindersItem[]>([]);
  const [tasks, setTasks] = React.useState<TaskItem[]>([]);
  const [notes, setNotes] = React.useState<NoteItem[]>([]); // Add notes state

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
    <Grid container sx={{ marginTop: "15px" }}>
      <Grid
        item
        xs={7}
        border={1}
        sx={{ position: "sticky", top: 0, marginTop: "5px" }}
      >
        <CalendarWithEvents
          selecteddate={selectedDate}
          setselecteddate={setSelectedDate}
          todos={todos}
          reminders={reminders}
          tasks={tasks}
          notes={notes} // Pass notes
        />
      </Grid>
      <Grid item xs={4} border={1}>
        <ToDos selecteddate={selectedDate} todos={todos} setTodos={setTodos} />
        <Reminders
          selecteddate={selectedDate}
          reminders={reminders}
          setReminders={setReminders}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Tasks
            selectedDate={selectedDate}
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
          />
        </Grid>
        <Grid item xs={6}>
          <Notes
            selectedDate={selectedDate}
            notes={notes}
            addNote={addNote}
            deleteNote={deleteNote}
          />
        </Grid>
      </Grid>
      <BottomAppBar />
    </Grid>
  );
};

export default Home;
