import { Dayjs } from "dayjs";

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  category: string;
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  is_finished: boolean;
}

export interface AddTask {
  title: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  is_finished: boolean;
}

