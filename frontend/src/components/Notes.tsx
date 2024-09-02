import * as React from "react";
import dayjs from "dayjs";
import {
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
  CircularProgress,
  Alert,
  Box,
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
import { ptStyle, stStyle } from "./Constants";

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
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const currentDate = dayjs();
  const dateToUse = selectedDate ? selectedDate : currentDate;

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
    setError(null); // Reset error when closing the dialog
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
        await dispatch(addNotes(notes2)).unwrap();
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
      setEditIndex(id);
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

  const handleDeleteNote = async (id: number) => {
    setLoading(true);
    try {
      await dispatch(deleteNotes(id)).unwrap();
    } catch (error) {
      setError("Failed to delete note.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: `0px 4px 15px rgba(0, 0, 0, 0.3)`,
        borderRadius: "8px",
        mb: 10,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={ptStyle} variant="h5" component="div" color="primary">
          Notes
        </Typography>

        {loading && <CircularProgress size={24} />}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {filteredNotes.length === 0 ? (
          <Typography sx={stStyle} variant="body1">
            No notes available for the selected date.
          </Typography>
        ) : (
          <List>
            {filteredNotes.map((note: NoteItem) => (
              <ListItem key={note.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemText primary={` ${note.content}`} />

                  <Box>
                    <IconButton onClick={() => handleEditNote(note.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        )}

        <IconButton
          onClick={() => openDialog("Add New Note", "")}
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </CardContent>

      <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
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
    </Card>
  );
};

export default Notes;
