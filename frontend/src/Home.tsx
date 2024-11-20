import * as React from "react";
import { Grid, Box } from "@mui/material";
import "./components/index.css";
import CalendarWithEvents from "./components/Calander";
import BottomAppBar from "./components/RespNavBar";
import { useDispatch } from "react-redux";
import { fetchTodos } from "./components/features/todos/todosActions";
import { fetchReminders } from "./components/features/reminders/remindersActions";
import Reminders from "./components/Reminder";
import { fetchNotes } from "./components/features/notes/notesActions";
import Notes from "./components/Notes";
import { fetchTasks } from "./components/features/tasks/tasksActions";
import Tasks from "./components/Tasks";
import { AppDispatch } from "./components/app/store";
import ToDos from "./components/ToDos";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchReminders());
    dispatch(fetchNotes());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={1} sx={{ marginTop: "15px" }}>
        {/* Calendar will appear on all screen sizes */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              position: "relative", // Use relative position instead of fixed
              width: "100%",
              height: "100%",
              paddingRight: "40%",
              marginLeft: "30px",
            }}
          >
            <CalendarWithEvents />
          </Box>
        </Grid>

        {/* These four items will appear only on laptop and larger devices */}
        <Grid
          item
          display={{ xs: "none", md: "flex" }} // Only show on medium screens (laptop) and above
          flexDirection={"column"}
          gap={2.5}
          xs={12}
          md={4}
          paddingRight={"20px"}
        >
          <ToDos />
          <Reminders />
          <Tasks />
          <Notes />
        </Grid>
      </Grid>

      <BottomAppBar />
    </>
  );
};

export default Home;
