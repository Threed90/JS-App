import {render} from './node_modules/lit-html/lit-html.js';
import {getTemplate} from './template.js';


render(await getTemplate(''), document.querySelector('tbody'));

solve();

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   async function onClick() {
      let searchingField = document.getElementById('searchField');

      render(await getTemplate(searchingField.value), document.querySelector('tbody'));

   }
}