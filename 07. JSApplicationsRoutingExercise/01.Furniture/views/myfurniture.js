import {html} from '../node_modules/lit-html/lit-html.js';

export function getMyFurnitureView(furnitures){
    return html`
    <header>
    <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/catalog">Dashboard</a>
            <div id="user">
                <a id="createLink" href="/create" >Create Furniture</a>
                <a id="profileLink" href="/myfurnitures" class="active">My Publications</a>
                <a id="logoutBtn" href="/logout">Logout</a>
            </div>
        </nav>
    </header>
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12" style="text-align: center;">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
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