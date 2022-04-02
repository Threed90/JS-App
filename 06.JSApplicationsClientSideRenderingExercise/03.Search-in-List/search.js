import {render} from './node_modules/lit-html/lit-html.js';
import {getTownList} from './template.js';

render(getTownList(), document.getElementById('towns'));

document.querySelector('button').addEventListener('click', search) ;


function search() {
   let towns = Array.from(document.querySelectorAll('#towns ul li'));

   let searchingValue = document.getElementById('searchText').value;

   let counter = 0;

   for (const town of towns) {
      //save insensitive search:
      if(town.textContent.toLowerCase().includes(searchingValue.toLowerCase())){
         town.classList.add('active');
         counter++;
      } else {
         town.classList.remove('active');
      }
   }

   if(counter){
      document.getElementById('result').textContent = `${counter} matches found`;
   } else {
      document.getElementById('result').textContent = '';
   }
}
