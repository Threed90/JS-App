import {request} from '../api/requests.js'
import page from '../node_modules/page/page.mjs';

function handleLoginSubmit(evt){
    debugger;
    evt.preventDefault();
    let formData = new FormData(evt.currentTarget);

    let email = formData.get('email');
    let pass = formData.get('password');

    request.user.login(email, pass)
    .then(res => {
        if(!res.ok){
            
            throw new Error('Unsuccessful login!');
        }

        return res.json();
    })
    .then(user => {
        sessionStorage.setItem('furniture-app-user', JSON.stringify(user));
        page.redirect('/');
    })
    .catch(err => {
        alert(err.message);
        
    });

    evt.currentTarget.reset();
}

function handleRegisterSubmit(evt){
    evt.preventDefault();

    let formData = new FormData(evt.currentTarget);

    let email = formData.get('email');
    let pass = formData.get('password')
    let rePass = formData.get('rePass');

    if(email && pass && pass === rePass){

        let userInfo = {
            email,
            password : pass
        };

        request.user.register(userInfo)
        .then(res => {
            if(!res.ok){
                throw new Error('Incorrect email or password!');
            }

            page.redirect('/login');
        })
        .catch(err => alert(err.message));

        evt.currentTarget.reset();
    } else {
        alert('Incorrect email or password!');
    }
}

function handleCreateFurnitureSubmit(evt){
    evt.preventDefault();

    let formData = new FormData(evt.currentTarget);

    let {make, model, year, description, price, img, material} = Object.fromEntries(formData);

    if(isValid(make, model, year, description, price, img)){
        let furniture = {
            make,
            model,
            year,
            description,
            price,
            img,
            material : (material || '')
        };

        request.furnitures.createNew(furniture)
        .then(res => {
            if(!res.ok){
                throw new Error('Unable to create new furniture!');
            }
            return res.json();
        })
        .then(f => {
            page.redirect(`/details/${f._id}`);
        })
        .catch(err => {
            alert(err.message);
        });

        evt.currentTarget.reset();
    } else {
        alert('Incorrect data input!');
    }
}

function handleEditFormSubmit(evt){
    evt.preventDefault();

    let id = evt.currentTarget.getAttribute('furniture-id');

    let formData = new FormData(evt.currentTarget);

    let {make, model, year, description, price, img, material} = Object.fromEntries(formData);

    if(isValid(make, model, year, description, price, img)){
        let furniture = {
            _id : id,
            make,
            model,
            year,
            description,
            price,
            img,
            material : (material || '')
        };

        request.furnitures.update(furniture)
        .then(res => {
            if(!res.ok){
                throw new Error('Unable to edit!')
            }
            return res.json();
        })
        .then(f => {
            page.redirect(`/details/${f._id}`);
        })
        .catch(err => alert(err.message));

    } else {
        alert('Incorrect data input!');
    }
}
export const event = {
    handleLoginSubmit,
    handleRegisterSubmit,
    handleCreateFurnitureSubmit,
    handleEditFormSubmit
}


function isValid(make, model, year, description, price, img){
    let isMakeCorrect = make.length > 3;
    let isModelCorrect = model.length > 3;
    let yearNum = Number(year);
    let isYearCorrect = yearNum && Number.isInteger(yearNum) && yearNum >= 1950 && yearNum <= 2050;
    let isDescCorrect = description.length > 10;
    let priceNum = Number(price);
    let isPriceCorrect = priceNum && priceNum >= 0;
    let imgRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi; // non-http required url

    if(isMakeCorrect && isModelCorrect && isYearCorrect && isDescCorrect && isPriceCorrect && imgRegex.test(img)){
        return true;
    } else {
        return false;
    }
}