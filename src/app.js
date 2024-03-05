import notesStore from './store/notes-store';
import { saveNote } from './usecases/save-note';
import { renderModal } from './presentation/modal/add-modal';
import { renderTable } from './presentation/table/render-table';
import { renderButton } from './presentation/buttons/render-button';
import { addButton } from './presentation/add-button/add-button';

export const NotesApp = async (element) => {
  element.innerHTML = 'Loading...';
  await notesStore.loadNextPage();
  element.innerHTML = '';

  renderTable(element);
  renderButton(element);
  addButton(element);
  renderModal(element, async (notesLike) => {
    const note = await saveNote(notesLike);
    notesStore.onNotesChanged(note);
    renderTable();
  });
}

