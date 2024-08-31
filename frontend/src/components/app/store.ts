import {  configureStore  } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice"
import remindersReducer from "../features/reminders/remindersSlice";
import NotesReducer from "../features/notes/notesSlice";
import TasksReducer from "../features/tasks/tasksSlice";
import CoreReducer from "../features/core/coreSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    reminders: remindersReducer,
    notes: NotesReducer,
    tasks: TasksReducer,
    core: CoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;