import { Note } from '../models/Note.model';
import { localhostNote } from '../mappers/localhost-note';
import { noteLocalhost } from '../mappers/note-localhost';

export const saveNote = async (newNote) => {
  const note = new Note(newNote);

  if (!note.title || !note.description) 
    throw new Error('Title and description are required.');

  const noteToSave = noteLocalhost(note);
  let noteUpdated;

  if (note.id) {
    noteUpdated = await updateNote(noteToSave);
  } else {
    noteUpdated = await createNote(noteToSave);
  }

  return localhostNote(noteUpdated);
}

const createNote = async (note) => {
  const url = `${import.meta.env.VITE_BASE_URL}/notes`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const newNote = await response.json();
  return newNote;
}

const updateNote = async (note) => {
  const url = `${import.meta.env.VITE_BASE_URL}/notes/${note.id}`;
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const updateNote = await response.json();
  return updateNote;
}
