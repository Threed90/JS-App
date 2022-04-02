import page from '../node_modules/page/page.mjs'
import {requests} from '../api/requests.js'

async function onCreateSubmit(evt){
    evt.preventDefault();

    let formData = new FormData(evt.currentTarget);

    let {title, description, imageURL} = Object.fromEntries(formData);

    let item = {
        title,
        description,
        img : imageURL
    }

    requests.items.create(item)
    .then(res => {
        if(res.ok){
            page.redirect('/catalog');
        }
    });
    formData.reset();
}

async function onLoginSubmit(evt){
    evt.preventDefault();
    
    let formData = new FormData(evt.currentTarget);

    let {email, password} = Object.fromEntries(formData);

    await requests.user.login(email, password)
    .then(res => res.json())
    .then(user => {
        sessionStorage.setItem('softterest-user', JSON.stringify(user));
        page.redirect('/');
    });
    formData.reset();
    

}

async function onRegisterSubmit(evt){
    evt.preventDefault();
debugger;
    let formData = new FormData(evt.currentTarget);

    let {email, password, repeatPassword} = Object.fromEntries(formData);

    if(isValid(email, password, repeatPassword)){
        let userInfo = {
            email,
            password
        };

        requests.user.register(userInfo)
        .then(res => res.json())
        .then(data => {
            sessionStorage.setItem('softterest-user', JSON.stringify(data));
                page.redirect('/');
        })

    }
}

function onEditSubmit(evt){
    evt.preventDefault();

    let formData = new FormData(evt.currentTarget);

    let {} = Object.fromEntries(formData);
}


export const event = {
    onCreateSubmit,
    onLoginSubmit,
    onRegisterSubmit,
    onEditSubmit
}

function isValid(email, password, repeatPassword){

    return email.length > 2 && password.length > 2 && password === repeatPassword;
}