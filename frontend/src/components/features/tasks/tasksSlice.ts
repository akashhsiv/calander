import { createSlice } from "@reduxjs/toolkit";
import { addTasks, deleteTasks, fetchTasks, updateTasks } from "./tasksActions";
import { TaskItem } from "./tasksTypes";

interface TasksState {
  tasks: TaskItem[];
}

const initialState: TasksState = {
  tasks: [],
};

const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTasks.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default TasksSlice.reducer;
