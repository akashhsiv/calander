import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddNoteItem, NoteItem } from "./notesTypes";

const API_BASE_URL = "https://dayflow-be.vercel.app/api/notes/";

// Fetch all todos
export const fetchNotes = createAsyncThunk("Notes/fetchNotes", async () => {
  const response = await axios.get<NoteItem[]>(API_BASE_URL);
  return response.data;
});

// Add a new todo
export const addNotes = createAsyncThunk(
  "notes/addNotes",
  async (newNotes: AddNoteItem) => {
    const response = await axios.post(API_BASE_URL, newNotes);
    return await response.data;
  }
);

// Update an existing todo
export const updateNotes = createAsyncThunk(
  "notes/updateNotes",
  async (updatedNote: NoteItem) => {
    const { id, ...data } = updatedNote;
    const response = await axios.put(`${API_BASE_URL}${id}/`, data);
    return response.data;
  }
);

// Delete a todo
export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  async (id: number) => {
    await axios.delete(`${API_BASE_URL}${id}/`);
    return id; // Return the id to remove it from the state
  }
);
