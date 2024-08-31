import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddRemindersItem, RemindersItem } from "./remindersTypes";

const API_BASE_URL = "http://127.0.0.1:8000/api/reminders/";

// Fetch all reminders
export const fetchReminders = createAsyncThunk("reminders/fetchReminders", async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
});

// Add a new Reminders
export const addReminders = createAsyncThunk(
  "reminders/addReminders",
  async (newReminders: AddRemindersItem) => {
    const response = await axios.post(API_BASE_URL, newReminders);
    return response.data;
  }
);

// Update an existing Reminders
export const updateReminders = createAsyncThunk(
  "reminders/updateReminders",
  async (updatedReminders: RemindersItem) => {
    const { id, ...data } = updatedReminders;
    const response = await axios.put(`${API_BASE_URL}${id}/`, data);
    return response.data;
  }
);

// Delete a Reminders
export const deleteReminders = createAsyncThunk(
  "reminders/deleteReminders",
  async (id: number) => {
    await axios.delete(`${API_BASE_URL}${id}/`);
    return id; // Return the id to remove it from the state
  }
);
