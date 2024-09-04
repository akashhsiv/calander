
export interface ToDoItem {
  id: number;
  content: string;
  date: string;
  completed: boolean;
}

export interface AddToDoItem {
  content: string;
  date: string;
  completed: boolean;
  user: number | null;
}
