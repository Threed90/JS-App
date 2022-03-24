import { html } from "../node_modules/lit-html/lit-html.js";
import {userInfo} from '../util/userInfo.js';

export function getDetailsView(furniture){
    return html`
    <header>
    <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/catalog" >Dashboard</a>
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
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${furniture.img.substring(0, 1) == '.' ? `.${furniture.img}` : furniture.img}/>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${furniture.make}</span></p>
                <p>Model: <span>${furniture.model}</span></p>
                <p>Year: <span>${furniture.year}</span></p>
                <p>Description: <span>${furniture.description}</span></p>
                <p>Price: <span>${furniture.price}</span></p>
                <p>Material: <span>${furniture.material ? furniture.material : ''}</span></p>
                <div>
                    <a href=/edit/${furniture._id} class="btn btn-info" style=${userInfo.getUserObj() && userInfo.getUserObj()._id == furniture._ownerId ? 'display: inline-block' : 'display: none'}>Edit</a>
                    <a href=/delete/${furniture._id} class="btn btn-red" style=${userInfo.getUserObj() && userInfo.getUserObj()._id == furniture._ownerId ? 'display: inline-block' : 'display: none'}>Delete</a>
                </div>
            </div>
        </div>
    </div>`
}