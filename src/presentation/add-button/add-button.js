import { showModal } from '../modal/add-modal';
import './add-button.css';

export const addButton = (element) => {
  const floatingActionButton = document.createElement('button');
  floatingActionButton.innerText = 'New Note';
  floatingActionButton.classList.add('fab-button');
  element.append(floatingActionButton);

  floatingActionButton.addEventListener('click', () => {
    showModal();
  });
}

