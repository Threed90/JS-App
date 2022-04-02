import {render} from './node_modules/lit-html/lit-html.js';
import {getOptionsTemplate} from './template.js';
import {requests} from './requests.js';

render(getOptionsTemplate(await requests.getItems()), document.getElementById('menu'));

document.querySelector('form input:nth-of-type(2)').addEventListener('click', await addItem);

async function addItem(evt) {
    evt.preventDefault();
    let inputValue = document.getElementById('itemText');

    if(inputValue.value){
        requests.addItem(inputValue.value);
        render(getOptionsTemplate(await requests.getItems()), document.getElementById('menu'));
        inputValue.value = '';
    }
}