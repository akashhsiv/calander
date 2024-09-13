import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddTask, TaskItem } from "./tasksTypes";

const API_BASE_URL = "https://dayflow-be.vercel.app/api/tasks/";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
});

export const addTasks = createAsyncThunk(
  "tasks/addTasks",
  async (newTasks: AddTask) => {
    const response = await axios.post(API_BASE_URL, newTasks);
    return response.data;
  }
);

export const updateTasks = createAsyncThunk(
  "tasks/updateTasks",
  async (updatedTasks: TaskItem) => {
    const { id, ...data } = updatedTasks;
    const response = await axios.put(`${API_BASE_URL}${id}/`, data);
    return response.data;
  }
);

export const deleteTasks = createAsyncThunk(
  "tasks/deleteTasks",
  async (id: number) => {
    await axios.delete(`${API_BASE_URL}${id}/`);
    return id; // Return the id to remove it from the state
  }
);
