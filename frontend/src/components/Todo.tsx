import * as React from "react";
import { Dayjs } from "dayjs";
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

interface ToDo {
  title: string;
  date: Dayjs;
  completed: boolean;
}

interface ToDoProps {
  selecteddate: Dayjs | null;
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDos: React.FC<ToDoProps> = ({ selecteddate, todos, setTodos }) => {
  const [newTodo, setNewTodo] = React.useState<string>("");

  const handleAddTodo = () => {
    if (newTodo && selecteddate) {
      setTodos([
        ...todos,
        { title: newTodo, date: selecteddate, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedTodos = todos
      .map((todo, idx) =>
        idx === index ? { ...todo, completed: !todo.completed } : todo
      )
      .filter((todo) => !todo.completed); // Remove completed to-dos
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  // Filter todos for the selected date
  const filteredTodos = todos.filter(
    (todo) => selecteddate && todo.date.isSame(selecteddate, "day")
  );

  return (
    <Card sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          To-Dos
        </Typography>
        {filteredTodos.length === 0 ? (
          <Typography variant="body1">
           Your Schedule is Free Today , Do you want Anything To-Do
          </Typography>
        ) : (
          <List>
            {filteredTodos.map((todo, index) => (
              <ListItem
                key={index}
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
                    onChange={() => handleCheckboxChange(index)}
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
              label="New To-Do"
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
