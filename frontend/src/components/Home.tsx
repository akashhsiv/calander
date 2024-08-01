import * as React from "react";
import { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import RespNavBar from "./RespNavBar";
import dayjs from "dayjs";
// import Tasks from "./Tasks"; // Update this if the file name is different
import ToDo from "./Todo";
import Reminder from "./Reminder";
import CalendarWithEvents from "./Calender"; // Update this if the file name is different

interface Task {
  title: string;
  description: string;
  startDate: Dayjs | null;
  finishDate: Dayjs | null;
  isFinished: boolean;
}

const Home = () => {
  const [selecteddate, setselecteddate] = React.useState<Dayjs | null>(dayjs());
  const [todos, setTodos] = React.useState([]);
  const [reminders, setReminders] = React.useState([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <Box>
      <RespNavBar />
      <Stack width={"95%"} mt={3} direction={"row"} spacing={2}>
        <CalendarWithEvents
          selecteddate={selecteddate}
          setselecteddate={setselecteddate}
          todos={todos}
          reminders={reminders}
          tasks={tasks}
        />
        <Box>
          {/* <Tasks selectedDate={selecteddate} tasks={tasks} addTask={addTask} /> */}
          <ToDo selecteddate={selecteddate} todos={todos} setTodos={setTodos} />
          <Reminder
            selecteddate={selecteddate}
            reminders={reminders}
            setReminders={setReminders}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
