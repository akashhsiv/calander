import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTodos } from "./../features/todos/todosActions";
import { AppDispatch, RootState } from "../app/store";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const AllTodos = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    if (!todos.length) {
      dispatch(fetchTodos());
    }
  }, [dispatch, todos]);

  return (
    <div>
      <Typography mb={3} variant="h4" component="h2" gutterBottom>
        All Todos
      </Typography>
      <Grid container spacing={3}>
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.id}>
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
                  {todo.content}
                </Typography>

                <Typography
                  variant="body1"
                  gutterBottom
                  display="flex"
                  alignItems="center"
                >
                  {todo.completed ? (
                    <>
                      <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      Completed
                    </>
                  ) : (
                    <>
                      <CancelIcon color="error" sx={{ mr: 1 }} />
                      Not Completed
                    </>
                  )}
                </Typography>

                <Typography variant="body2" color="textSecondary">
                  {todo.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllTodos;
