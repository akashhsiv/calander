import * as React from "react";
import dayjs, { Dayjs } from "dayjs"; // Import dayjs for handling dates
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
  FormControlLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Define the TaskItem interface
export interface TaskItem {
  title: string;
  description: string;
  category: string;
  startDate: Dayjs | null;
  finishDate: Dayjs | null;
  isFinished: boolean;
}

// Define the TaskForm component props
interface TaskFormProps {
  selectedDate: Dayjs | null;
  tasks: TaskItem[];
  addTask: (task: TaskItem) => void;
  deleteTask: (index: number) => void;
}

const Tasks: React.FC<TaskFormProps> = ({
  selectedDate,
  tasks,
  addTask,
  deleteTask,
}) => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>(""); // New state for category
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [finishDate, setFinishDate] = React.useState<Dayjs | null>(null);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

  const handleSubmit = () => {
    // Default to current date and one week later if no dates are selected
    const now = dayjs();
    const defaultStartDate = startDate || now;
    const defaultFinishDate = finishDate || now.add(7, "day");

    if (title && category) {
      addTask({
        title,
        description,
        category,
        startDate: defaultStartDate,
        finishDate: defaultFinishDate,
        isFinished,
      });
      setTitle("");
      setDescription("");
      setCategory("");
      setStartDate(null);
      setFinishDate(null);
      setIsFinished(false);
      setIsFormVisible(false); // Hide form after submission
    }
  };

  const handleCheckboxChange = (index: number) => {
    deleteTask(index);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.startDate &&
      selectedDate &&
      task.startDate.isSame(selectedDate, "day")
  );

  return (
    <Card sx={{
        marginLeft: 5,
        width: "800px",
        bgcolor: "background.paper",
        boxShadow: "2"}}>
      <CardContent>
        <Typography variant="h5" component="div" color="primary">
          Tasks
        </Typography>
        {filteredTasks.length === 0 ? (
          <Typography variant="body1">
            No Task is Scheduled, Is There Anything You'd Like to Add
          </Typography>
        ) : (
          <List>
            {filteredTasks.map((task, index) => (
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
                    checked={task.isFinished}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.title}
                  secondary={
                    <>
                      <Typography variant="body2">
                        {task.startDate?.format("DD-MM-YYYY")} -{" "}
                        {task.finishDate?.format("DD-MM-YYYY")}
                      </Typography>
                      <Typography variant="body2">
                        {task.description}
                      </Typography>
                      <Typography variant="body2">
                        Category: {task.category}
                      </Typography>
                      <Typography variant="body2">
                        Status: {task.isFinished ? "Completed" : "Incomplete"}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <TextField
            label="Add Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            color="primary"
            onClick={() => setIsFormVisible(true)}
            sx={{ ml: 2 }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </CardContent>

      <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value as string)}
            >
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              slotProps={{
                textField: { margin: "normal", fullWidth: true },
              }}
            />
            <DatePicker
              label="Finish Date"
              value={finishDate}
              onChange={(date) => setFinishDate(date)}
              slotProps={{
                textField: { margin: "normal", fullWidth: true },
              }}
            />
          </LocalizationProvider>
          <FormControlLabel
            control={
              <Checkbox
                checked={isFinished}
                onChange={(e) => setIsFinished(e.target.checked)}
              />
            }
            label="Finished"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormVisible(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Tasks;
