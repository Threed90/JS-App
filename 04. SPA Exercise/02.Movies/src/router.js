import { render } from "./render.js";
import { requests } from "./requests.js";

export const router = {
    '/' : render.showHomePage,
    '/login' : render.showLoginPage,
    '/register' : render.showRegisterPage,
    '/addMovie' : render.showAddMoviePage,
    '/edit' : render.showEditPage,
    '/delete' : deleteMovie,
    '/like' : addLike,
    '/logout' : logoutUser,
    '/detail' : render.showMovieDetailPage,
    '/unlike' : removeLike
}

function logoutUser(){
    requests.logout();
    render.showHomePage();
}

async function deleteMovie(movieId){
    await requests.deleteMovie(movieId);
    render.showHomePage();
}

function addLike(movieId){
    requests.addALike(movieId);
    render.showMovieDetailPage(movieId);
}

function removeLike(movieId, userId){
    requests.removeALike(movieId, userId);
    render.showMovieDetailPage(movieId);
}