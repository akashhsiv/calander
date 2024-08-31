import { Dayjs } from "dayjs";

export interface ToDoItem {
  id: number;
  content: string;
  date: Dayjs;
  completed: boolean;
}

export interface AddToDoItem {
  content: string;
  date: string;
  completed: boolean;
  user: number | null;
}
