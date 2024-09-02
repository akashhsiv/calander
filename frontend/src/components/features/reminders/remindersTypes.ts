
export interface RemindersItem {
  id: number;
  content: string;
  date: string;
  category: string;
}

export interface AddRemindersItem {
  user: number | null;
  content: string;
  date: string ;
  category: string;
}
