import {render} from './node_modules/lit-html/lit-html.js';
import {ulTemplate} from './template.js';

document.getElementById('btnLoadTowns').addEventListener('click', (e) => {
    e.preventDefault();
    render(ulTemplate(), document.getElementById('root'));
    document.getElementById('towns').value = '';
})

