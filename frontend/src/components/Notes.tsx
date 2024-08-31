import * as React from "react";
import dayjs from "dayjs";
import {
  Box,
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
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { AddNoteItem, NoteItem } from "./features/notes/notesTypes";
import {
  addNotes,
  deleteNotes,
  updateNotes,
} from "./features/notes/notesActions";


const Notes: React.FC = () => {
   const selectedDate = useSelector(
     (state: RootState) => state.core.selectedDate
   );
  const dispatch = useDispatch<AppDispatch>();

  const notes1 = useSelector((state: RootState) => state.notes.notes);
  const auth = useSelector((state: RootState) => state.core.auth);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = React.useState<string>("");
  const [dialogContent, setDialogContent] = React.useState<string>("");
  const [, setLoading] = React.useState<boolean>(false);
  const [, setError] = React.useState<string | null>(null);

  // Use current date as default if no date is selected
  const currentDate = dayjs();
  const dateToUse = selectedDate ? selectedDate : currentDate;

  // Filter notes based on the dateToUse
  const filteredNotes = notes1.filter((note: NoteItem) =>
    dayjs(note.date).isSame(dateToUse, "day")
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

  const handleAddNote = async () => {
    if (dialogContent.trim() !== "") {
      setLoading(true);
      try {
        const notes2: AddNoteItem = {
          content: dialogContent,
          date: dateToUse.format("YYYY-MM-DD"),
          user: auth.userId,
        };
        await dispatch(addNotes(notes2)).unwrap(); // Dispatch the addNote action
        setDialogContent("");
        closeDialog();
      } catch (error) {
        setError("Failed to add note.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditNote = (id: number) => {
    const noteToEdit = notes1.find((note: NoteItem) => note.id === id);
    if (noteToEdit) {
      setEditIndex(id); // Store ID instead of index
      setDialogContent(noteToEdit.content);
      openDialog("Edit Note", noteToEdit.content);
    } else {
      console.error("Note not found.");
    }
  };

  const handleSaveEdit = async () => {
    if (editIndex !== null) {
      const updatedNote: NoteItem = {
        ...notes1.find((note: NoteItem) => note.id === editIndex)!,
        content: dialogContent,
        date: dateToUse.format("YYYY-MM-DD"),
      };

      setLoading(true);
      try {
        await dispatch(updateNotes(updatedNote)).unwrap();
        closeDialog();
      } catch (error) {
        setError("Failed to update note.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Invalid edit index.");
    }
  };

  const handleDeleteNote = async (index: number) => {
    setLoading(true);
    try {
      await dispatch(deleteNotes(index)).unwrap();
    } catch (error) {
      setError("Failed to delete note.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h5" component="div" color="primary">
              Notes 📝
            </Typography>
            <IconButton
              onClick={() => openDialog("Add New Note", "")}
              color="primary"
            >
              <AddIcon />
            </IconButton>
          </Box>
          <List>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note: NoteItem, index: number) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        onClick={() => handleEditNote(note.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={` ${note.content}`}
                    secondary={dateToUse.format("YYYY-MM-DD")}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">
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
