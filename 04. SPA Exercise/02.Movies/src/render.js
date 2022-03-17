import { requests } from './requests.js';
import { createCustomElement } from './utilities.js';
import { dom } from './DOMLibrary.js'

let user;



function showHomePage() {
    user = JSON.parse(sessionStorage.getItem('user-movie-app'));

    hideAllBodyElements();

    if (user) {
        showLogedUserNavBar();
        
        dom.addMovieButtonSection.style.display = 'block';

    } else {
        showUnlogedUserNavBar();
    }

    dom.homePageBrandElement.style.display = 'block';
    dom.titleSection.style.display = 'block';
    dom.movieSection.style.display = 'block';

    let movieContainerElement = dom.movieSection.querySelector('div.card-deck.d-flex.justify-content-center');

    appendMovieElements(movieContainerElement);
}

function showLoginPage() {
    showUnlogedUserNavBar();

    hideAllBodyElements();
    dom.loginSection.style.display = 'block';
}

function showRegisterPage() {
    showUnlogedUserNavBar();

    hideAllBodyElements();
    dom.registerSection.querySelector('form').reset();
    dom.registerSection.style.display = 'block';
}

async function showEditPage(movieId) {
    showLogedUserNavBar();

    hideAllBodyElements();
    let movie = await requests.getAMovie(movieId);
    dom.editSection.querySelector('#title').value = movie.title;
    dom.editSection.querySelector('textarea.form-control').textContent = movie.description;
    dom.editSection.querySelector('#imageUrl').value = movie.img;
    dom.editSection.querySelector('form').setAttribute('movie-id', movieId);
    dom.editSection.style.display = 'block';
}

function showAddMoviePage() {
    showLogedUserNavBar();

    hideAllBodyElements();
    dom.addMovieSection.style.display = 'block';
}

async function showMovieDetailPage(movieId) {
    showLogedUserNavBar();

    hideAllBodyElements();
    await rewriteAMovieView(movieId);
    dom.detailMovieSection.style.display = 'block';
}

function hideAllBodyElements() {
    dom.homePageBrandElement.style.display = 'none';
    dom.titleSection.style.display = 'none';
    dom.addMovieButtonSection.style.display = 'none';
    dom.movieSection.style.display = 'none';
    dom.addMovieSection.style.display = 'none';
    dom.detailMovieSection.style.display = 'none';
    dom.editSection.style.display = 'none';
    dom.loginSection.style.display = 'none';
    dom.registerSection.style.display = 'none';
}

function showLogedUserNavBar() {
    dom.ancherElements[1].style.display = 'inline-block';
    dom.ancherElements[2].style.display = 'none';
    dom.ancherElements[3].style.display = 'none';

    dom.ancherElements[0].style.display = 'inline-block';
    dom.ancherElements[0].textContent = `Welcome, ${user.email}`;
}

function showUnlogedUserNavBar() {
    dom.ancherElements[1].style.display = 'none';
    dom.ancherElements[2].style.display = 'inline-block';
    dom.ancherElements[3].style.display = 'inline-block';

    dom.ancherElements[0].style.display = `none`;
}

async function appendMovieElements(element) {
    element.textContent = null;
    user = JSON.parse(sessionStorage.getItem('user-movie-app'));

    let movies = await requests.getMovies();
    let fragment = document.createDocumentFragment();

    if (user) {
        for (const movie of movies) {
            let movieElement = createCustomElement('div', { class: 'card mb-4' },
                createCustomElement('img', { class: 'card-img-top', src: movie.img, alt: 'Card image cap', width: '400' }),
                createCustomElement('div', { class: 'card-body' },
                    createCustomElement('h4', { class: 'card-title', textContent: movie.title })),
                createCustomElement('div', { class: 'card-footer' },
                    createCustomElement('a', { href: `/${movie._id}`, },
                        createCustomElement('button', { class: 'btn btn-info', type: 'button', textContent: 'Details' }))));

            fragment.appendChild(movieElement);
        }

    } else {
        for (const movie of movies) {
            let movieElement = createCustomElement('div', { class: 'card mb-4' },
                createCustomElement('img', { class: 'card-img-top', src: movie.img, alt: 'Card image cap', width: '400' }),
                createCustomElement('div', { class: 'card-body' },
                    createCustomElement('h4', { class: 'card-title', textContent: movie.title })),
                createCustomElement('div', { class: 'card-footer' },
                    createCustomElement('a', { href: `/${movie._id}` })));

            fragment.appendChild(movieElement);
        }
    }

    element.appendChild(fragment);
}

async function rewriteAMovieView(movieId) {
    user = JSON.parse(sessionStorage.getItem('user-movie-app'));
    let movie = await requests.getAMovie(movieId);

    let title = dom.detailMovieSection.querySelector('h1');
    title.textContent = `Movie title: ${movie.title}`;
    title.style.paddingRight = '150px';

    let img = dom.detailMovieSection.querySelector('img');
    img.src = movie.img;

    let description = dom.detailMovieSection.querySelector('div.col-md-4.text-center p');
    description.textContent = movie.description;

    let buttons = dom.detailMovieSection.querySelectorAll('div.col-md-4.text-center a');

    if (user._id == movie._ownerId) {
        for (let index = 0; index < buttons.length; index++) {
            buttons[index].setAttribute('movie-id', movie._id);
            buttons[index].style.display = 'inline-block';
        }
    } else {
        for (let index = 0; index < buttons.length; index++) {
            buttons[index].setAttribute('movie-id', movie._id);
            if (index < 2)
                buttons[index].style.display = 'none';
        }
    }

    let existingLike = await requests.getSpecificLike(movie._id, user._id);

    if (existingLike.length) {
        buttons[2].textContent = 'Unlike';
        buttons[2].href = '/unlike'
    } else {
        buttons[2].textContent = 'Like';
        buttons[2].href = '/like';
    }

    let likes = dom.detailMovieSection.querySelector('div.col-md-4.text-center span.enrolled-span');
debugger;
    let numOfLikes = await requests.getLikes(movieId)
    likes.textContent = `Liked ${numOfLikes}`;
}

export const render = {
    showHomePage,
    showLoginPage,
    showRegisterPage,
    showEditPage,
    showAddMoviePage,
    showMovieDetailPage
}