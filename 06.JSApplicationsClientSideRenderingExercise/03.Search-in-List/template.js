import {html} from './node_modules/lit-html/lit-html.js';
import {towns} from './towns.js';

export function getTownList(){
    return html`
    <ul>
        ${towns.map(t => html`<li>${t}</li>`)}
    </ul>
    `;
}