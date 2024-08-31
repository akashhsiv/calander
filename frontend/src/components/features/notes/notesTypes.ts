
export interface NoteItem {
  id: number;
  date: string;
  content: string;
}

export interface AddNoteItem{
    user: number |null;
    date:string;
    content: string;
}
