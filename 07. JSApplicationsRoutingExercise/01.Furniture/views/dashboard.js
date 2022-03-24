import {html} from '../node_modules/lit-html/lit-html.js';
import {userInfo} from '../util/userInfo.js';

export function getDashboardView(furnitures){
    return html`
    <header>
    <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/catalog" class="active">Dashboard</a>
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
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
        ${furnitures.map(f => html`
        <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${f.img} />
                            <p>${f.description}</p>
                            <footer>
                                <p>Price: <span>${f.price} $</span></p>
                            </footer>
                            <div>
                                <a href=/details/${f._id} class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>`)}
        </div>
    </div>`
}