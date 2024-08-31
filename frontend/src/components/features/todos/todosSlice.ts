import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./todosActions";
import { ToDoItem } from "./todosTypes";

// Define the state type
interface ToDoState {
  todos: ToDoItem[];
}

// Initialize state with todos array
const initialState: ToDoState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
