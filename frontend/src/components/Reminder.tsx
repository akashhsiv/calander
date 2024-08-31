import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon

export interface RemindersItem {
  title: string;
  date: Dayjs;
  category: string;
}

interface ReminderProps {
  selecteddate: Dayjs | null;
  reminders: RemindersItem[];
  setReminders: React.Dispatch<React.SetStateAction<RemindersItem[]>>;
}

const categories = [
  { title: "Birthday", symbol: "🎉", firstLetter: "B" },
  { title: "Interview", symbol: "💼", firstLetter: "I" },
  { title: "Meeting", symbol: "📅", firstLetter: "M" },
  { title: "Bill", symbol: "💰", firstLetter: "B" },
  { title: "Event", symbol: "🎟️", firstLetter: "E" },
];

const Reminders: React.FC<ReminderProps> = ({
  selecteddate,
  reminders,
  setReminders,
}) => {
  const [newReminder, setNewReminder] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [showCategory, setShowCategory] = React.useState<boolean>(false);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleAddReminder = () => {
    // Use current date if no date is selected
    const reminderDate = selecteddate || dayjs();

    if (newReminder && selectedCategory) {
      if (editIndex !== null) {
        // Editing an existing reminder
        const updatedReminders = reminders.map((reminder, index) =>
          index === editIndex
            ? { ...reminder, title: newReminder, category: selectedCategory }
            : reminder
        );
        setReminders(updatedReminders);
        setEditIndex(null); // Clear edit mode
      } else {
        // Adding a new reminder
        setReminders([
          ...reminders,
          {
            title: newReminder,
            date: reminderDate,
            category: selectedCategory,
          },
        ]);
      }
      setNewReminder("");
      setSelectedCategory("");
      setShowCategory(false); // Hide the category dropdown after adding
      handleDialogClose(); // Close dialog
    } else if (newReminder) {
      // Show category dropdown if no category is selected
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
    setNewReminder(reminder.title);
    setSelectedCategory(reminder.category);
    setEditIndex(index);
    setShowCategory(true); // Show category dropdown when editing
    setDialogOpen(true); // Open dialog when editing
  };

  const handleDeleteReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const filteredReminders = reminders.filter(
    (reminder) => selecteddate && reminder.date.isSame(selecteddate, "day")
  );

  return (
    <Card sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" color="primary">
          Reminders 🔔
        </Typography>
        {filteredReminders.length === 0 ? (
          <Typography variant="body1">
            Do you want me to remind you of something?
          </Typography>
        ) : (
          <List>
            {filteredReminders.map((reminder, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  py: 1,
                }}
              >
                <ListItemText
                  primary={reminder.title}
                  secondary={`Created on: ${reminder.date.format(
                    "YYYY-MM-DD"
                  )} - ${reminder.category}`}
                />
                <IconButton
                  color="primary"
                  onClick={() => handleEditReminder(index)}
                  sx={{ ml: 2 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteReminder(index)}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
        <ListItem>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
              label="Add Here"
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              onClick={() => setDialogOpen(true)} // Open dialog when TextField is clicked
              onKeyDown={handleKeyPress}
              sx={{ flexGrow: 1 }}
            />
            {showCategory && (
              <Autocomplete
                id="category-autocomplete"
                options={categories}
                getOptionLabel={(option) => option.title}
                onChange={(_, value) =>
                  setSelectedCategory(value ? value.title : "")
                }
                renderInput={(params) => (
                  <MuiTextField {...params} label="Category" />
                )}
                sx={{ ml: 2, width: 200 }}
              />
            )}
            <IconButton
              color="primary"
              onClick={() => setDialogOpen(true)} // Open dialog when AddIcon is clicked
              sx={{ ml: 2 }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </ListItem>
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
          {showCategory && (
            <Autocomplete
              id="category-autocomplete"
              options={categories}
              getOptionLabel={(option) => option.title}
              onChange={(_, value) =>
                setSelectedCategory(value ? value.title : "")
              }
              renderInput={(params) => (
                <MuiTextField {...params} label="Category" />
              )}
              sx={{ mt: 1 }}
            />
          )}
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
