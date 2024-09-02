import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "./../features/tasks/tasksActions";
import { AppDispatch, RootState } from "../app/store";
import { Card, CardContent, Typography, Grid, Chip } from "@mui/material";

export const AllTasks = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks]);

  return (
    <div>
      <Typography mb={3} variant="h4" component="h2" gutterBottom>
        All Tasks
      </Typography>
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card
              sx={{
                bgcolor: "background.paper",
                boxShadow: `0px 4px 15px rgba(0, 0, 0, 0.3)`,
                borderRadius: "8px",
                m: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {task.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {task.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Start Date:{" "}
                  {task.start_date
                    ? task.start_date.format("YYYY-MM-DD")
                    : "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  End Date:{" "}
                  {task.end_date ? task.end_date.format("YYYY-MM-DD") : "N/A"}
                </Typography>
                <Chip
                  label={task.is_finished ? "Finished" : "In Progress"}
                  color={task.is_finished ? "success" : "warning"}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllTasks;
