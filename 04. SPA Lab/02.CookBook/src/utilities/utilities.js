import {router} from './router.js';

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}

async function getRecipes() {
    const response = await fetch('http://localhost:3030/data/recipes');
    const recipes = await response.json();

    return recipes;
}

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    const recipe = await response.json();

    return recipe;
}

function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', onClick: toggleCard, id : recipe._id },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;

    async function toggleCard() {
        const fullRecipe = await getRecipeById(recipe._id);

        result.replaceWith(await createRecipeCard(fullRecipe));
    }
}

function createRecipeCard(recipe) {
    
    
    const result = e('article', {id : recipe._id},
        e('h2', {}, recipe.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
            e('div', { className: 'ingredients' },
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
        e('div', {className : 'controls'}, 
            e('button', {onClick : () => {router['/edit'](recipe._id)}}, 'Edit'),
            e('button', {onClick : () => {router['/delete'](recipe._id)}}, 'Delete')
            )
        
    );

    let token = sessionStorage.getItem('authToken');
    let buttons = result.querySelectorAll('.controls button');
    if(token){
        fetch('http://localhost:3030/users/me', {
            method : 'get',
            headers : { 'X-Authorization' : token}
        })
        .then(res => res.json())
        .then(user => {
            if(user._id != recipe._ownerId){
                for (let index = 0; index < buttons.length; index++) {
                    buttons[index].style.display = 'none';
                }
            }
        }); 
    } else{
        for (let index = 0; index < buttons.length; index++) {
            buttons[index].style.display = 'none';
        }
    }
    return result;
}

export async function logout() {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
    });
    
    if (response.status == 204) {
        sessionStorage.removeItem('authToken');
        render.showLoginForm();
    } else {
        console.error(await response.json());
    }
}

export const utilities = {
    e,
    getRecipes,
    getRecipeById,
    createRecipePreview,
    createRecipeCard,
    logout
};