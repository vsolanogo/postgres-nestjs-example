export interface Note {
  id: string;
  createdAt: Date;
  name: string;
  category: string;
  content: string;
  dates: Array<string> | null;
  isArchived: boolean;
}

export interface NoteCreatorParams {
  name: string;
  category: string;
  content: string;
  isArchived?: boolean;
  createdAt?: Date;
}
