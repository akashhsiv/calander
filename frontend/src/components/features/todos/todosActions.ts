import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddToDoItem, ToDoItem } from "./todosTypes";

const API_BASE_URL = "http://127.0.0.1:8000/api/todos/";

// Fetch all todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
});

// Add a new todo
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo: AddToDoItem) => {
    const response = await axios.post(API_BASE_URL, newTodo);
    return response.data;
  }
);

// Update an existing todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo: ToDoItem) => {
    const { id, ...data } = updatedTodo;
    const response = await axios.put(`${API_BASE_URL}${id}/`, data);
    return response.data;
  }
);

// Delete a todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await axios.delete(`${API_BASE_URL}${id}/`);
    return id; // Return the id to remove it from the state
  }
);
