import notesStore from '../../store/notes-store';
import { renderTable } from '../table/render-table';
import './render-button.css';

export const renderButton = (element) => {
  const contentButton = document.createElement('div');
  contentButton.className = 'content-buttons';

  const nextButton = document.createElement('button');
  nextButton.innerText = 'Next Page >';

  const previousButton = document.createElement('button');
  previousButton.innerText = '< Previous Page';

  const currentPageLevel = document.createElement('span');
  currentPageLevel.innerText = notesStore.getCurrentPage();
  currentPageLevel.id = 'current-page';

  contentButton.append(previousButton, currentPageLevel, nextButton);
  element.append(contentButton);

  nextButton.addEventListener('click', async () => {
    await notesStore.loadNextPage();
    currentPageLevel.innerText = notesStore.getCurrentPage();

    renderTable(element);
  });

  previousButton.addEventListener('click', async () => {
    await notesStore.loadPreviousPage();
    currentPageLevel.innerText = notesStore.getCurrentPage();

    renderTable(element);
  });
}

