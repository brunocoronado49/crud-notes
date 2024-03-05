import { getNoteById } from '../../usecases/get-note';
import html from './add-modal.html?raw';
import './add-modal.css';

let modal, form;
let loadedNote = {};

export const showModal = async (id) => {
  modal?.classList.remove('hide-modal');
  loadedNote = {};

  if (!id) return;
  const note = await getNoteById(id);
  setFormValues(note);
}

export const hideModal = () => {
  modal?.classList.add('hide-modal');
  form?.reset();
}

const setFormValues = (note) => {
  form.querySelector('[name="title"]').value = note.title;
  form.querySelector('[name="description"]').value = note.description;
  form.querySelector('[name="is-active"]').checked = note.isActive;

  loadedNote = note;
}

export const renderModal = (element, callback) => {
  if (modal) return;
  modal = document.createElement('div');
  modal.innerHTML = html;
  modal.className = 'modal-container hide-modal';
  form =  modal.querySelector('form');

  modal.addEventListener('click', (event) => {
    if (event.target.className !== 'modal-container') return;
    hideModal();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const noteLike = {...loadedNote};

    for (const [key, value] of formData) {
      if (key === 'isActive') {
        noteLike[key] = (value === 'on') ? true : false;
        continue;
      }

      noteLike[key] = value;
    }

    await callback(noteLike);
    hideModal();
  });

  element.append(modal);
}
