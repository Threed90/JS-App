import {html} from '../node_modules/lit-html/lit-html.js';
import { userInfo } from '../util/userInfo.js';

export function getDetailView(item){
    return html`
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
        <div class="container">
            <a class="navbar-brand" href="/">
                <img src="../images/idea.png" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
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
    <div class="container home some">
        <img class="det-img" src=${item.img.substring(0, 1) == '.' ? `.${item.img}` : item.img}>
        <div class="desc">
            <h2 class="display-5">${item.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${item.description}</p>
        </div>
        ${userInfo.getUserObj() && userInfo.getUserObj()._id == item._ownerId 
            ? html`<div class="text-center">
                        <a class="btn detb" href="/delete/${item._id}" >Delete</a>
                    </div>` 
            : ''}
        
    </div>
    <footer class="footer">
        <div class="container-footer">
            <span>© We cherish your ideas! Share them with others!</span>
        </div>
    </footer>`;
}