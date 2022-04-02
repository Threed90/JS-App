import {html} from './node_modules/lit-html/lit-html.js';

export function ulTemplate(){
    return html`
        <ul>
            ${getTows().map(t => html`<li>${t}</li>`)}
        </ul>
    `
}

//will be too overbuild if make diffrend file for getting input data...
function getTows(){
    
    let towsInput = document.getElementById('towns');

    return towsInput.value.split(', ');
}