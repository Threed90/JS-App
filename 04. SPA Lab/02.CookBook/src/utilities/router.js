import {render} from './render.js';
import { onSubmitCreate, onSubmitLogin, onSubmitRegister } from './requests.js';

const createForm = document.querySelector('#create form');
const loginForm = document.querySelector('#login form');
const registerForm = document.querySelector('#register form');
const editForm = document.querySelector('#editing form');

function loadCatalogPage(){
    render.showCatalogPage();
}

function loadLoginPage(){
    render.showLoginForm();

    loginForm.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmitLogin([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));
}

function loadCreatePage(){
    render.showCreateForm();

    createForm.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmitCreate([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));
    createForm.reset();
}

function loadRegisterPage(){
    render.showRegisterForm();

    registerForm.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmitRegister([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));
}

function logoutOperation(){
    
    render.showLoginForm();
}

async function loadEditPage(id){
    render.showEditForm();

    let recipe = await fetch('http://localhost:3030/data/recipes/' + id)
                    .then(res => res.json())
                    .then(data => data);

    editForm.querySelector('input[name="name"]').value = recipe.name;
    editForm.querySelector('input[name="img"]').value = recipe.img;
    editForm.querySelector('textarea[name="ingredients"]').value = recipe.ingredients.join('\n');
    editForm.querySelector('textarea[name="steps"]').value = recipe.steps.join('\n');

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let {name, img, ingredients, steps} = Object.fromEntries(formData);

        fetch(`http://localhost:3030/data/recipes/${id}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : sessionStorage.getItem('authToken')
            },
            body : JSON.stringify({
                name,
                img,
                ingredients : ingredients.split('\n'),
                steps : steps.split('\n')
            })
        })
        .then(res => {
           if(res.ok == false){
               throw new Error('Not updated');
           } 

           render.showCatalogPage();
        })
        .catch(err => alert(err.message));
    })
}
{/* <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Update Recipe"></input> */}

function deleteOperation(id){
    fetch(`http://localhost:3030/data/recipes/${id}`, {
        method : 'DELETE',
        headers : { 'X-Authorization' : sessionStorage.getItem('authToken') },
    })
    .then(res => {
        if(res.ok){
            
            document.getElementById(id).remove();
            render.showCatalogPage();
        }
    });
}

export const router = {
    '/' : loadCatalogPage,
    '/login' : loadLoginPage,
    '/register' : loadRegisterPage,
    '/create' : loadCreatePage,
    '/logout' : logoutOperation,
    '/edit' : loadEditPage,
    '/delete' : deleteOperation
}