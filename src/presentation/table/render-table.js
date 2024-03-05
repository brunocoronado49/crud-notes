import notesStore from '../../store/notes-store';
import { deleteNoteById } from '../../usecases/delete-note';
import { showModal } from '../modal/add-modal';
import './render-table.css';

let table;

const createTable = () => {
  const table = document.createElement('table');
  const tableHeaders = document.createElement('thead');
  tableHeaders.innerHTML = `
    <tr class="table-header">
      <th class="table-title">ID</th>
      <th class="table-title">Title</th>
      <th class="table-title">Description</th>
      <th class="table-title">Active</th>
      <th class="table-title">Actions</th>
    </tr>
  `;

  const tableBody = document.createElement('tbody');
  table.append(tableHeaders, tableBody);

  return table;
}

const tableSelectListener = (event) => {
  const element = event.target.closest('.select-note');
  if (!element) return;

  const id = element.getAttribute('data-id');
  showModal(id);
}

const tableDeleteListener = async (event) => {
  const element = event.target.closest('.delete-note');
  if (!element) return;

  const id = element.getAttribute('data-id');

  try {
    await deleteNoteById(id);
    await notesStore.reloadPage();

    document.querySelector('#current-page').innerText = notesStore.getCurrentPage();
    renderTable();
  } catch (error) {
    console.log(error);
    alert('Delete has failed.');
  }
}

export const renderTable = (element) => {
  const notes = notesStore.getNotes();

  if (!table) {
    table = createTable();
    element.append(table);

    table.addEventListener('click', tableSelectListener);
    table.addEventListener('click', tableDeleteListener);
  }

  let tableHTML = '';
  notes.forEach(note => {
    tableHTML += `
      <tr>
        <td class="table-content">${note.id}</td>
        <td class="table-content">${note.title}</td>
        <td class="table-content">${note.description}</td>
        <td class="table-content">${note.isActive === true ? 'Active' : 'Inactive'}</td>
        <td class="table-content">
          <a href="#" class="select-note" data-id="${note.id}">Select</a>
          <a href="#" class="delete-note" data-id="${note.id}">Delete</a>
        </td>
      </tr>
    `;
  });

  table.querySelector('tbody').innerHTML = tableHTML;
}