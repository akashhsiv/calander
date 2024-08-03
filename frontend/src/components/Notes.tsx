// Notes.tsx
import * as React from "react";
import { Dayjs } from "dayjs";
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
  const [newNote, setNewNote] = React.useState<string>("");
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editContent, setEditContent] = React.useState<string>("");

  const handleAddNote = () => {
    if (selectedDate && newNote.trim() !== "") {
      const note: NoteItem = {
        date: selectedDate,
        content: newNote,
        emoji: "📝", // Default emoji or use a fixed one
      };
      addNote(note);
      setNewNote("");
    }
  };

  const handleEditNote = (index: number) => {
    setEditIndex(index);
    setEditContent(notes[index].content);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === editIndex ? { ...note, content: editContent } : note
      );
      addNote(updatedNotes); // Update notes state
      setEditIndex(null);
      setEditContent("");
    }
  };

  const handleDeleteNote = (index: number) => {
    deleteNote(index);
  };

  return (
    <Card sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" color="primary">
          Notes 📝
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Keep track of your thoughts and ideas. Add a new note below!
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <TextField
            fullWidth
            label="New Note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            disabled={editIndex !== null} // Disable input if editing
          />
          <IconButton
            onClick={handleAddNote}
            color="primary"
            disabled={editIndex !== null}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <List>
          {notes.map((note, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleEditNote(index)}>
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
          ))}
        </List>
        {editIndex !== null && (
          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              fullWidth
              label="Edit Note"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <IconButton onClick={handleSaveEdit} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Notes;
