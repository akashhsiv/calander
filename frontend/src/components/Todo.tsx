import * as React from "react";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {   AppDispatch, RootState } from "./app/store";
import { addTodo, updateTodo } from "./features/todos/todosActions";
import { ToDoItem } from "./features/todos/todosTypes";


const ToDos: React.FC = () => {
   const selectedDate = useSelector(
     (state: RootState) => state.core.selectedDate
   );
   const auth = useSelector((state: RootState) => state.core.auth);

  const dispatch = useDispatch<AppDispatch>();

   const todos = useSelector((state: RootState) => state.todos.todos);

  const currentDate = dayjs();
  const effectiveDate = selectedDate || currentDate;

  const [newTodo, setNewTodo] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setLoading] = React.useState<boolean>(false);
  const [, setError] = React.useState<string | null>(null);
console.log(auth)
  
  const handleAddTodo = async () => {
    
    if (newTodo) {
      const newTodoItem = {
        content: newTodo,
        date: effectiveDate.format("YYYY-MM-DD"), // Format to YYYY-MM-DD
        completed: false,
        user: auth.userId,
      };

      setLoading(true);
      try {
        await dispatch(addTodo(newTodoItem)).unwrap(); // Unwrap to handle errors
        setNewTodo("");
        setDialogOpen(false);
      } catch (error) {
        setError("Failed to add to-do item.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };


 const handleCheckboxChange = async (id: number, completed: boolean) => {
   setLoading(true);
   try {
     const todoToUpdate = todos.find((todo: ToDoItem) => todo.id === id);
     if (todoToUpdate) {
       await dispatch(
         updateTodo({
           ...todoToUpdate,
           completed: !completed,
         })
       ).unwrap(); 
     }
   } catch (error) {
     setError("Failed to update to-do item.");
     console.error(error);
   } finally {
     setLoading(false);
   }
 };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    handleAddTodo();
    handleDialogClose();
  };

  const filteredTodos = todos.filter(
    (todo: ToDoItem) => effectiveDate && dayjs(todo.date).isSame(effectiveDate, "day")
  );

  return (
    <Card sx={{ width: "100%", bgcolor: "background.paper", p: 1, height:"28%"}}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" component="div" color="primary">
            To-Dos ✓
          </Typography>
          <IconButton color="primary" onClick={handleDialogOpen}>
            <AddIcon />
          </IconButton>
        </Box>

        {filteredTodos.length === 0 ? (
          <Typography variant="body1">
            Your Schedule is Free Today, Do you want Anything To-Do?
          </Typography>
        ) : (
          <List>
            {filteredTodos.map((todo: ToDoItem) => (
              <ListItem
                key={todo.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  py: 1,
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo.id, todo.completed)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={todo.content}
                  secondary={`Created on: ${todo.date}`}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}

        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add a New To-Do</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Add Here"
              fullWidth
              variant="standard"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ToDos;
