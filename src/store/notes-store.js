import { loadNotesByPage } from '../usecases/load-notes-page';

const state = {
  notes: [],
  currentPage: 0
};

const loadNextPage = async () => {
  const notes = await loadNotesByPage(state.currentPage + 1);
  if (notes.length === 0) return;

  state.currentPage += 1;
  state.notes = notes;
}

const loadPreviousPage = async () => {
  if (state.currentPage === 1) return;
  const notes = await loadNotesByPage(state.currentPage - 1);

  state.notes = notes;
  state.currentPage -= 1;
}

const onNotesChanged = (notesUpdated) => {
  let wasFound = false;
  state.notes = state.notes.map(n => {
    if (n.id === notesUpdated.id) {
      wasFound = true;
      return notesUpdated;
    } else {
      return notesUpdated;
    }
  });

  if (state.notes.length < 10 && !wasFound) {
    state.notes.push(notesUpdated);
  }
}

const reloadPage = async () => {
  const notes = await loadNotesByPage(state.currentPage);

  if (notes.length === 0) {
    await loadPreviousPage();
    return;
  }

  state.notes = notes;
}

export default {
  loadNextPage,
  loadPreviousPage,
  onNotesChanged,
  reloadPage,
  getNotes: () => [...state.notes],
  getCurrentPage: () => state.currentPage
};
