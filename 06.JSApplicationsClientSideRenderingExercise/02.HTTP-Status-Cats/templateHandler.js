import { html } from './node_modules/lit-html/lit-html.js';
import * as status from './catSeeder.js';

export function getTemplate(){
    return html`
        <ul>
            ${status.cats.map(c => html`${singleLiElement(c)}`)}
        </ul>
    `
};

function singleLiElement(cat) {
    return html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${showStatus}>Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`
}

function showStatus(evt){
    debugger;
    let divToShow = evt.target.parentNode.querySelector('.status');

    if(evt.target.textContent == 'Show status code'){
        divToShow.style.display = 'block';
        evt.target.textContent = 'Hide status code';
    } else {
        divToShow.style.display = 'none';
        evt.target.textContent = 'Show status code';
    }

}