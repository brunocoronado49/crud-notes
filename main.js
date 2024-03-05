import { NotesApp } from './src/app';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div>
    <h1 class="title">Hello Notes</h1>
    <div class="card"></div>
  </div>
`;

const element = document.querySelector('.card');
NotesApp(element);

