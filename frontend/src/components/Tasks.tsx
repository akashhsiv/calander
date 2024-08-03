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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Define the TaskItem interface
export interface TaskItem {
  title: string;
  description: string;
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
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [finishDate, setFinishDate] = React.useState<Dayjs | null>(null);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

  const handleSubmit = () => {
    // Default to current date and one week later if no dates are selected
    const now = dayjs();
    const defaultStartDate = startDate || now;
    const defaultFinishDate = finishDate || now.add(7, "day");

    if (title) {
      addTask({
        title,
        description,
        startDate: defaultStartDate,
        finishDate: defaultFinishDate,
        isFinished,
      });
      setTitle("");
      setDescription("");
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
    <Card sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
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
                        Status: {task.isFinished ? "Completed" : "Incomplete"}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        {isFormVisible ? (
          <Box sx={{ mt: 2 }}>
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
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isFinished}
                    onChange={(e) => setIsFinished(e.target.checked)}
                  />
                }
                label="Finished"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ ml: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default Tasks;
