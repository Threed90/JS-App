import { dom } from "./DOMLibrary.js";
import { router } from "./router.js";
import { requests } from "./requests.js";

export function loadEvents(){
    loadNavBarEvent();
    loadLoginEvent();
    loadAddMovieEvent();
    loadAddMovieFormEvent();
    loadMoviesEventButton();
    loadFullViewButtons();
    loadEditFormEvent();
    loadRegisterFormEvent();
}

function loadNavBarEvent(){
    dom.navBarSection.addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.tagName == 'A'){
            let url = new URL(e.target);
            
            router[url.pathname]();
        }
    });
}

function loadLoginEvent(){
    dom.loginSection.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let isLoged = await requests.loginUser({
            'email' : formData.get('email'),
            'password' : formData.get('password')
        }, e.currentTarget);

        if(isLoged){
            router['/']();
        } else {
            router['/login']();
        }
    })
}

function loadAddMovieEvent(){
    dom.addMovieButtonSection.addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.tagName == 'A'){
            router[new URL(e.target).pathname]();
        }
    });
}

function loadAddMovieFormEvent(){
    dom.addMovieSection.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let movie = {
            title : formData.get('title'),
            img : formData.get('imageUrl'),
            description : formData.get('description')
        };

        try {
            await requests.createMovie(movie);
            router['/']();
        } catch (error) {
            alert(error.message)
        }
        
    })
}

function loadMoviesEventButton(){
    dom.movieSection.addEventListener('click', async (e) => {
        e.preventDefault();

        if(e.target.tagName == 'BUTTON'){
            let ancher = e.target.parentNode;

            let movieId = new URL(ancher).pathname.substring(1);

            await router['/detail'](movieId);
        }
    })
}

function loadFullViewButtons(){
    dom.detailMovieSection.addEventListener('click', (e) => {
        e.preventDefault();

        if(e.target.tagName == 'A'){
            let url = new URL(e.target);

            let path = url.pathname;
            let id = e.target.getAttribute('movie-id')
            if(path == '/unlike'){
                router[path](id, JSON.parse(sessionStorage.getItem('user-movie-app'))._id);
            } else {
                router[path](id);
            }
        }
    })
}

function loadEditFormEvent(){
    dom.editSection.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let id = e.currentTarget.getAttribute('movie-id');
        requests.editMovie(id, {
            title : formData.get('title'),
            description : formData.get('description'),
            img : formData.get('imageUrl')
        });

        router['/']();
    })
}
function loadRegisterFormEvent(){
    dom.registerSection.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let {email, password, repeatPassword} = Object.fromEntries(formData);

        if(!email){
            alert('Please enter a email!');
        } else if( password != repeatPassword){
            alert('Repeat password does not match the password. Please reenter password fields!');
        } else {
            let userInfo = {
                email,
                password
            }

            let path = await requests.registerUser(userInfo);
            formData.set('email', '');
            formData.set('password', '');
            formData.set('repeatPassword', '');
            router[path]();
        }
    })
}