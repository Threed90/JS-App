import {html} from '../node_modules/lit-html/lit-html.js';
import {userInfo} from '../util/userInfo.js';

export function getHomeView(){
    return html`
    <header>
        <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/catalog">Dashboard</a>
            <div id="user" style=${userInfo.getUserObj() ? 'display: inline-block' : 'display : none'}>
                <a id="createLink" href="/create" >Create Furniture</a>
                <a id="profileLink" href="/myfurnitures" >My Publications</a>
                <a id="logoutBtn" href="/logout">Logout</a>
            </div>
            <div id="guest" style=${userInfo.getUserObj() ? 'display: none' : 'display : inline-block'}>
                <a id="loginLink" href="/login">Login</a>
                <a id="registerLink" href="/register">Register</a>
            </div>
        </nav>
    </header>
    <div class="container">
    <div class="row space-top">
            <div class="col-md-12" style="text-align: center;">
                <h1>Welcome to Furniture System</h1>
            </div>
        </div>
    </div>`
}