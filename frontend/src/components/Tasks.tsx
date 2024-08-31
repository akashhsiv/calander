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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { TaskItem } from "./features/tasks/tasksTypes";
import { addTasks, updateTasks } from "./features/tasks/tasksActions";

const Tasks: React.FC = () => {
  const selectedDate = useSelector(
    (state: RootState) => state.core.selectedDate
  );
  const dispatch = useDispatch<AppDispatch>();
  const tasks1 = useSelector((state: RootState) => state.tasks.tasks);
  const auth = useSelector((state: RootState) => state.core.auth);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [finishDate, setFinishDate] = React.useState<Dayjs | null>(null);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    const now = dayjs();
    const defaultStartDate = startDate || now;
    const defaultFinishDate = finishDate || now.add(7, "day");

    if (title && category) {
      try {
        const newTask = {
          title,
          description,
          category,
          start_date: defaultStartDate.format("YYYY-MM-DD"),
          end_date: defaultFinishDate.format("YYYY-MM-DD"),
          is_finished: isFinished,
          user: auth.userId,
        };

        await dispatch(addTasks(newTask)).unwrap();

        setTitle("");
        setDescription("");
        setCategory("");
        setStartDate(null);
        setFinishDate(null);
        setIsFinished(false);
        setIsFormVisible(false);
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };

  const handleCheckboxChange = async (taskId: number) => {
    try {
      const taskToUpdate = tasks1.find((task: TaskItem) => task.id === taskId);

      if (taskToUpdate) {
        await dispatch(
          updateTasks({
            ...taskToUpdate,
            is_finished: !taskToUpdate.is_finished,
          })
        ).unwrap();
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };
  const filteredTasks = tasks1.filter(
    (task: TaskItem) =>
      selectedDate && dayjs(task.start_date).isSame(selectedDate, "day")
  );

  const handleFormOpen = () => {
    setStartDate(selectedDate); 
    setIsFormVisible(true); 
  };
  return (
    <Card sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" component="div" color="primary">
            Tasks
          </Typography>
          <IconButton color="primary" onClick={handleFormOpen}>
            <AddIcon />
          </IconButton>
        </Box>

        {filteredTasks.length === 0 ? (
          <Typography variant="body1">
            No Task is Scheduled, Is There Anything You'd Like to Add?
          </Typography>
        ) : (
          <List>
            {filteredTasks.map((task: TaskItem) => (
              <ListItem
                key={task.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  py: 1,
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={task.is_finished}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.title}
                  secondary={
                    <>
                      <Typography variant="body2">
                        {dayjs(task.start_date).format("YYYY-MM-DD")} -{" "}
                        {dayjs(task.end_date).format("YYYY-MM-DD")}
                      </Typography>
                      <Typography variant="body2">
                        {task.description}
                      </Typography>
                      <Typography variant="body2">
                        Category: {task.category}
                      </Typography>
                      <Typography variant="body2">
                        Status: {task.is_finished ? "Completed" : "Incomplete"}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
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
