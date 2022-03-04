async function getPreviews() {
    let recipes = await fetch('http://localhost:3030/jsonstore/cookbook/recipes').then(res => res.json());

    return recipes;
}

function showFullArticle(id, article) {

    article.classList.remove('preview');
    article.textContent = null;
    
    fetch('http://localhost:3030/jsonstore/cookbook/details/' + id)
        .then(res => res.json())
        .then(data => {
            let h2 = document.createElement('h2');
            h2.textContent = data['name'];
            article.appendChild(h2);

            let bandDiv = document.createElement('div');
            bandDiv.classList.add('band');

            let thumbDiv = document.createElement('div');
            thumbDiv.classList.add('thumb');

            let img = document.createElement('img');
            img.src = data['img'];
            thumbDiv.appendChild(img);
            bandDiv.appendChild(thumbDiv);

            let ingredientsDiv = document.createElement('div');
            ingredientsDiv.classList.add('ingredients');

            let IngredientsH3 = document.createElement('h3');
            IngredientsH3.textContent = 'Ingredients:';
            ingredientsDiv.appendChild(IngredientsH3);

            let ingrUl = document.createElement('ul');

            for (const ingredient of data['ingredients']) {
                let li = document.createElement('li');
                li.textContent = ingredient;
                ingrUl.appendChild(li);
            }

            ingredientsDiv.appendChild(ingrUl);
            bandDiv.appendChild(ingredientsDiv);
            article.appendChild(bandDiv);

            let descDiv = document.createElement('div');
            descDiv.classList.add('description');

            let descH3 = document.createElement('h3');
            descH3.textContent = 'Preparation:';
            descDiv.appendChild(descH3);

            for (const step of data['steps']) {
                let p = document.createElement('p');
                p.textContent = step;
                descDiv.appendChild(p);
            }

            article.appendChild(descDiv);
        });
}

function showPreviewArticle(id, article) {
    article.textContent = null;
    article.classList.add('preview');

    fetch('http://localhost:3030/jsonstore/cookbook/recipes/' + id)
        .then(res => res.json())
        .then(data => {
            let titleElement = document.createElement('div');
            titleElement.classList.add('title');

            let h2 = document.createElement('h2');
            h2.textContent = data.name;
            titleElement.appendChild(h2);
            article.appendChild(titleElement);

            let imgContainer = document.createElement('div');
            imgContainer.classList.add('small');

            let img = document.createElement('img');
            img.src = data.img;
            imgContainer.appendChild(img);
            article.appendChild(imgContainer);
        })
}

async function loadRecipes() {
    let recipes = await getPreviews();

    let mainElement = document.querySelector('body > main');

    for (const key in recipes) {

        let article = getPreviewArticle(key, recipes);
        
        article.addEventListener('click', (e) => {
            
            if (e.currentTarget.className == 'preview') {
                showFullArticle(key, e.currentTarget);
            } else {
                showPreviewArticle(key, e.currentTarget);
            }
        })

        mainElement.appendChild(article);
    }
}

function getPreviewArticle(key, recipes) {
    let article = document.createElement('article');
    article.classList.add('preview');

    let titleElement = document.createElement('div');
    titleElement.classList.add('title');

    let h2 = document.createElement('h2');
    h2.textContent = recipes[key].name;
    titleElement.appendChild(h2);
    article.appendChild(titleElement);

    let imgContainer = document.createElement('div');
    imgContainer.classList.add('small');

    let img = document.createElement('img');
    img.src = recipes[key].img;
    imgContainer.appendChild(img);
    article.appendChild(imgContainer);

    return article;
}

window.addEventListener('load', loadRecipes);