import { localhostNote } from '../mappers/localhost-note';

export const getNoteById = async (noteId) => {
  const url = `${import.meta.env.VITE_BASE_URL}/notes/${noteId}`;
  const response = await fetch(url);
  const data = await response.json();

  const note = localhostNote(data);
  return note;
}
