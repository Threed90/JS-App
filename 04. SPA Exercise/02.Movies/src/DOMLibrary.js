// whole nav bar:
let navBarSection = document.querySelector('#container nav.navbar.navbar-expand-lg.navbar-dark.bg-dark');

//nav bar login, logout, register and welcomeMsg:
let ancherElements = Array.from(document.querySelectorAll('#container nav ul li>a'));

//for home page elements:
let homePageBrandElement = document.getElementById('home-page');
let titleSection = document.querySelector('#container h1.text-center');
let addMovieButtonSection = document.getElementById('add-movie-button');
let movieSection = document.getElementById('movie');


//for add movie form:
let addMovieSection = document.getElementById('add-movie');

// for movie detail view (example view)
let detailMovieSection = document.getElementById('movie-example');

// for edit form:
let editSection = document.getElementById('edit-movie');

// for login form:
let loginSection = document.getElementById('form-login');

// for register form:
let registerSection = document.getElementById('form-sign-up');

export const dom = {
    navBarSection,
    ancherElements,
    titleSection,
    homePageBrandElement,
    addMovieButtonSection,
    movieSection,
    addMovieSection,
    detailMovieSection,
    editSection,
    loginSection,
    registerSection
}