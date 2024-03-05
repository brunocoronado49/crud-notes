import { localhostNote } from '../mappers/localhost-note';

export const loadNotesByPage = async (page = 1) => {
  const url = `${import.meta.env.VITE_BASE_URL}/notes?_page=${page}`;

  const response = await fetch(url);
  const obj = await response.json();
  const notes = obj.data.map(localhostNote);
  console.log(notes);
  return notes;
}
