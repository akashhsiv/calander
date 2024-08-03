import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export interface ToDoItem {
  id: number;
  title: string;
  date: Dayjs;
  completed: boolean;
}

interface ToDoProps {
  selecteddate: Dayjs | null;
  todos: ToDoItem[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
}

const ToDos: React.FC<ToDoProps> = ({ selecteddate, todos, setTodos }) => {
  // Default to current date if selecteddate is null
  const currentDate = dayjs();
  const effectiveDate = selecteddate || currentDate;

  const [newTodo, setNewTodo] = React.useState<string>("");

  const handleAddTodo = () => {
    if (newTodo) {
      const newTodoItem: ToDoItem = {
        id: todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1,
        title: newTodo,
        date: effectiveDate,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleCheckboxChange = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const filteredTodos = todos.filter(
    (todo) => effectiveDate && todo.date.isSame(effectiveDate, "day")
  );

  return (
    <Card sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" color="primary">
          To-Dos ✓
        </Typography>
        {filteredTodos.length === 0 ? (
          <Typography variant="body1">
            Your Schedule is Free Today, Do you want Anything To-Do?
          </Typography>
        ) : (
          <List>
            {filteredTodos.map((todo) => (
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
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={todo.title}
                  secondary={`Created on: ${todo.date.format("YYYY-MM-DD")}`}
                />
              </ListItem>
            ))}
          </List>
        )}
        <ListItem>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
              label="Add Here"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ flexGrow: 1 }}
            />
            <IconButton color="primary" onClick={handleAddTodo} sx={{ ml: 2 }}>
              <AddIcon />
            </IconButton>
          </Box>
        </ListItem>
      </CardContent>
    </Card>
  );
};

export default ToDos;
