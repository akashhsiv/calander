
export interface TaskItem {
  id: number;
  title: string;
  description: string;
  start_date:string | null;
  end_date: string | null;
  is_finished: boolean;
}

export interface AddTask {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_finished: boolean;
}

