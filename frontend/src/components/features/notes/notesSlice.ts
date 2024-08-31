import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteItem } from "./notesTypes";
import {  addNotes, deleteNotes, fetchNotes, updateNotes } from "./notesActions";

// Define the state type
interface NotesState {
  notes: NoteItem[];
}

const initialState: NotesState = {
  notes: [],
};

const NotesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<NoteItem[]>) => {
        state.notes = action.payload;
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNotes.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export default NotesSlice.reducer;
