import {html} from '../node_modules/lit-html/lit-html.js';
import { userInfo } from '../util/userInfo.js';

export function getHomeView(){
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
    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="d-md-flex flex-md-equal ">
            <div class="col-md-5">
                <img class="responsive" src="./images/01.svg" />
            </div>
            <div class="home-text col-md-7">
                <h2 class="featurette-heading">Do you wonder if your idea is good?</h2>
                <p class="lead">Join our family =)</p>
                <p class="lead">Post your ideas!</p>
                <p class="lead">Find what other people think!</p>
                <p class="lead">Comment on other people's ideas.</p>
            </div>
        </div>
        <div class="bottom text-center">
            <a class="btn btn-secondary btn-lg " href="/register" style=${userInfo.getUserObj() ? 'display: none' : 'display: inline-block'}>Get Started</a>
        </div>
    </div>
    <footer class="footer">
        <div class="container-footer">
            <span>© We cherish your ideas! Share them with others!</span>
        </div>
    </footer>`;
}