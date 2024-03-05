export const deleteNoteById = async (noteId) => {
  const url = `${import.meta.env.VITE_BASE_URL}/notes/${noteId}`;
  const response = await fetch(url, {
    method: 'DELETE'
  });

  const deletedNote = await response.json();
  console.log({ deletedNote });

  return true;
}
