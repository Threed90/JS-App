import { utilities } from './utilities.js';

const recipesSection = document.getElementById('recipes');
const loginSection = document.getElementById('login');
const createSection = document.getElementById('create');
const registerSection = document.getElementById('register');
const editSection = document.getElementById('editing');
const navAnchers = document.querySelectorAll('nav a');

async function showCatalogPage() {

    hideData(sessionStorage.getItem('authToken'));

    recipesSection.style.display = 'block';

    const recipes = await utilities.getRecipes();
    const cards = recipes.map(utilities.createRecipePreview);

    recipesSection.textContent = null;
    document.querySelector('a[href="/"]').classList.add('active');

    let h2 = utilities.e('h2', {}, 'Catalog');
    recipesSection.appendChild(h2);
    cards.forEach(c => recipesSection.appendChild(c));

    document.getElementById('logoutBtn').addEventListener('click', utilities.logout);
}

function showLoginForm() {
    hideData();
    document.querySelector('a[href="/login"]').classList.add('active');
    loginSection.style.display = 'block';
}

function showRegisterForm() {
    hideData();
    document.querySelector('a[href="/register"]').classList.add('active');
    registerSection.style.display = 'block';
}

function showCreateForm() {
    hideData(sessionStorage.getItem('authToken'));
    document.querySelector('a[href="/create"]').classList.add('active');
    createSection.style.display = 'block';
}

function showEditForm(){
    hideData();
    document.querySelector('body header').style.display = 'none';
    editSection.style.display = 'block';
    
}



function hideData(token) {
    
    if (token) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }

    for (let index = 0; index < navAnchers.length; index++) {
        navAnchers[index].classList.remove('active');
        
    }

    recipesSection.style.display = 'none';
    loginSection.style.display = 'none';
    createSection.style.display = 'none';
    registerSection.style.display = 'none';
    editSection.style.display = 'none';

}
export const render = {
    showCatalogPage,
    showLoginForm,
    showRegisterForm,
    showCreateForm,
    showEditForm
}