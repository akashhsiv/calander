import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Autocomplete,
  TextField as MuiTextField,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { addReminders, deleteReminders, updateReminders } from "./features/reminders/remindersActions";
import { RemindersItem } from './features/reminders/remindersTypes';
import  dayjs from 'dayjs';


const categories = [
  { title: "Birthday", symbol: "🎉", firstLetter: "B" },
  { title: "Interview", symbol: "💼", firstLetter: "I" },
  { title: "Meeting", symbol: "📅", firstLetter: "M" },
  { title: "Bill", symbol: "💰", firstLetter: "B" },
  { title: "Event", symbol: "🎟️", firstLetter: "E" },
];



const Reminders: React.FC= () => {
   const selectedDate = useSelector(
     (state: RootState) => state.core.selectedDate
   );
  
  const dispatch = useDispatch<AppDispatch>();
  const reminders = useSelector((state: RootState) => state.reminders.reminders);
  const auth = useSelector((state: RootState) => state.core.auth);
  const [newReminder, setNewReminder] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

   const handleAddReminder = async () => {
     const reminderDate = selectedDate || dayjs();

     if (newReminder && selectedCategory) {
       setLoading(true);
       try {
         if (editIndex !== null) {
           // Editing an existing reminder
           const updatedReminder = {
             ...reminders[editIndex],
             content: newReminder,
             category: selectedCategory,
             date: reminderDate.format("YYYY-MM-DD"),
           };
           await dispatch(updateReminders(updatedReminder)).unwrap();
           setEditIndex(null); // Clear edit mode 
         } else {
           // Adding a new reminder
           const newReminderData = {
             content: newReminder,
             date: reminderDate.format("YYYY-MM-DD"),
             category: selectedCategory,
             user: auth.userId,
           };
           await dispatch(addReminders(newReminderData)).unwrap();
         }
         setNewReminder("");
         setSelectedCategory("");
         handleDialogClose(); // Close dialog
       } catch (error) {
         setError("Failed to add or update reminder.");
         console.error(error);
       } finally {
         setLoading(false);
       }
     } else if (newReminder) {
       setShowCategory(true);
     }
   };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior (e.g., form submission)
      handleAddReminder();
    }
  };

  const handleEditReminder = (index: number) => {
    const reminder = reminders[index];
    setNewReminder(reminder.content);
    setSelectedCategory(reminder.category);
    setEditIndex(index);
    setDialogOpen(true); // Open dialog when editing
  };
const handleDeleteReminder = async (index: number) => {
  setLoading(true);
  try {
    const reminderId = reminders[index].id;
    await dispatch(deleteReminders(reminderId)).unwrap();
  } catch (error) {
    setError("Failed to delete reminder.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewReminder(""); // Clear the input field
    setSelectedCategory(""); // Clear the selected category
    setError(""); // Clear the error message
  };

  const filteredReminders = reminders.filter(
    (reminder:RemindersItem) => selectedDate && dayjs(reminder.date).isSame(selectedDate, "day")
  );

  return (
    <Card sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div" color="primary">
            Reminders 🔔
          </Typography>
          <IconButton
            color="primary"
            onClick={() => setDialogOpen(true)} // Open dialog when AddIcon is clicked
          >
            <AddIcon />
          </IconButton>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : filteredReminders.length === 0 ? (
          <Typography variant="body1">
            There are no reminders for the selected day.
          </Typography>
        ) : (
          <List>
            {filteredReminders.map((reminder:RemindersItem, index:number) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={reminder.content}
                  secondary={`Created on: ${reminder.date} - ${reminder.category}`}
                />
                <IconButton
                  color="primary"
                  onClick={() => handleEditReminder(index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteReminder(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </CardContent>

      {/* Dialog for adding or editing a reminder */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          Add a New Reminder
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDialogClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 1}}>
            Do you want me to remind you of something?
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Reminder"
            fullWidth
            variant="standard"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Autocomplete
            id="category-autocomplete"
            options={categories}
            getOptionLabel={(option) => option.title}
            value={
              categories.find((cat) => cat.title === selectedCategory) || null
            }
            onChange={(_, value) =>
              setSelectedCategory(value ? value.title : "")
            }
            renderInput={(params) => (
              <MuiTextField {...params} label="Category" />
            )}
            sx={{ mt: 2 }} // Added margin to separate from the reminder text field
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddReminder}>Add</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Reminders;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setShowCategory(_arg0: boolean) {
  throw new Error("Function not implemented.");
}

