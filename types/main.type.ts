export interface NoteCardProps {
  id: string | number;
  title: string;
  description: string;
  dateandtime: string;
  tags?: string[]; //
}
export interface TodoRouteParams {
  item: NoteCardProps;
}

export type TodoItem = {
  id: string;
  title: string;
  dateandtime: string;
  description: string;
};
