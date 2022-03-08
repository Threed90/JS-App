function createRecipe(){
    let token = JSON.parse(localStorage.getItem('user')).accessToken;
    
    let formElement = document.querySelector('form');

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let {name, img, ingredients, steps} = Object.fromEntries(formData);

        if(name && img && ingredients && steps){
            let recipeInfo = {
                name,
                img,
                ingredients : ingredients.split('\n'),
                steps : steps.split('\n')
            };
            fetch('http://localhost:3030/data/recipes', {
                method : 'POST',
                headers : {
                    'X-Authorization' : token,
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(recipeInfo)
            })
            .then(res => res.json())
            .then(recipe => {
                window.location.href = './successCreate.html';
            })
        } else {
            window.location.href = './createError.html';
        }
    })
}

window.addEventListener('load', createRecipe)