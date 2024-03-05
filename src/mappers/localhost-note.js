import { Note } from '../models/Note.model';

export const localhostNote = (localhostNote) => {
  const { id, title, description, isActive } = localhostNote;
  return new Note({
    id,
    title,
    description,
    isActive
  });
}
