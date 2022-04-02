import {html} from '../node_modules/lit-html/lit-html.js';
import { userInfo } from '../util/userInfo.js';

export function getCatalogView(items){
    return html`
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
        <div class="container">
            <a class="navbar-brand" href="/">
                <img src="./images/idea.png" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/catalog">Dashboard</a>
                    </li>
                    <li class="nav-item" style=${userInfo.getUserObj() ? 'display: inline-block' : 'display: none'}>
                        <a class="nav-link" href="/create">Create</a>
                    </li>
                    <li class="nav-item" style=${userInfo.getUserObj() ? 'display: inline-block' : 'display: none'}>
                        <a class="nav-link" href="/logout">Logout</a>
                    </li>
                    <li class="nav-item" style=${userInfo.getUserObj() ? 'display: none' : 'display: inline-block'}>
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item" style=${userInfo.getUserObj() ? 'display: none' : 'display: inline-block'}>
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div id="dashboard-holder">
        ${items && items.length > 0 
            ? items.map(e => 
                html`<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
                       <div class="card-body">
                           <p class="card-text">${e.title}</p>
                       </div>
                       <img class="card-image" src=${e.img.substring(0, 1) == '.' ? `.${e.img}` : e.img} alt="Card image cap">
                       <a class="btn" href="/details/${e._id}">Details</a>
                   </div>`
                    )
            : html`<h1>No ideas yet! Be the first one :)</h1>`}
    </div>
    <footer class="footer">
        <div class="container-footer">
            <span>© We cherish your ideas! Share them with others!</span>
        </div>
    </footer>`;
}