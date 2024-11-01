export interface NoteCardProps {
  id: string | number;
  title: string;
  description: string;
  dateandtime: string;
}
export interface TodoRouteParams {
  item: NoteCardProps;
}
