import * as React from "react";
import dayjs ,{ Dayjs } from "dayjs";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

export interface NoteItem {
  date: Dayjs;
  content: string;
  emoji: string;
}

interface NotesProps {
  selectedDate: Dayjs | null;
  notes: NoteItem[];
  addNote: (note: NoteItem) => void;
  deleteNote: (index: number) => void;
}

const Notes: React.FC<NotesProps> = ({
  selectedDate,
  notes,
  addNote,
  deleteNote,
}) => {
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = React.useState<string>("");
  const [dialogContent, setDialogContent] = React.useState<string>("");

  // Use current date as default if no date is selected
  const currentDate = dayjs();
  const dateToUse = selectedDate ? selectedDate : currentDate;

  // Filter notes based on the dateToUse
  const filteredNotes = notes.filter((note) =>
    note.date.isSame(dateToUse, "day")
  );

  const openDialog = (title: string, content: string) => {
    setDialogTitle(title);
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditIndex(null);
    setDialogContent("");
  };

  const handleAddNote = () => {
    if (dialogContent.trim() !== "") {
      const note: NoteItem = {
        date: dateToUse,
        content: dialogContent,
        emoji: "📝", // Default emoji or use a fixed one
      };
      addNote(note);
      closeDialog();
    }
  };

  const handleEditNote = (index: number) => {
    setEditIndex(index);
    openDialog("Edit Note", filteredNotes[index].content);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedNote: NoteItem = {
        ...filteredNotes[editIndex],
        content: dialogContent,
      };
      addNote(updatedNote);
      closeDialog();
    }
  };

  const handleDeleteNote = (index: number) => {
    deleteNote(index);
  };

  return (
    <>
      <Card
        sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}
      >
        <CardContent>
          <Typography variant="h5" component="div" color="primary">
            Notes 📝
          </Typography>
          <Typography variant="body1">
            Keep track of your thoughts and ideas. Add a new note below!
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Add note content"
              value={dialogContent}
              onChange={(e) => setDialogContent(e.target.value)}
              sx={{ flexGrow: 1, mr: 1 }} // Adjusted size
            />
            <IconButton
              onClick={() => openDialog("Add New Note", dialogContent)}
              color="primary"
            >
              <AddIcon />
            </IconButton>
          </Box>
          <List>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        onClick={() => handleEditNote(index)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteNote(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={`${note.emoji} ${note.content}`}
                    secondary={note.date.format("DD-MM-YYYY")}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No notes available for the selected date.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        maxWidth="sm" // Adjusted maxWidth
        fullWidth
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogTitle === "Add New Note"
              ? "Enter your new note below:"
              : "Edit your note below:"}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Note Content"
            fullWidth
            value={dialogContent}
            onChange={(e) => setDialogContent(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={
              dialogTitle === "Add New Note" ? handleAddNote : handleSaveEdit
            }
            color="primary"
          >
            {dialogTitle === "Add New Note" ? "Add Note" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Notes;
