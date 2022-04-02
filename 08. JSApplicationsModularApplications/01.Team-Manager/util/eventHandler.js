import page from '../node_modules/page/page.mjs'
import { requests } from '../api/requests.js'
import {userInfo} from '../util/userInfo.js'

async function onCreateSubmit(evt) {
    debugger;
    evt.preventDefault();

    let formData = new FormData(evt.currentTarget);

    let { name, description, logoUrl } = Object.fromEntries(formData);

    if (isValidCreatingOrEditing(name, description, logoUrl)) {
        let item = {
            name,
            description,
            logoUrl
        }

        let team = await requests.items.create(item)
            .then(res => {
                if (!res.ok) {
                    throw new Error()
                }
                return res.json();
            })
            .then(async data => {
                let membership = await fetch('http://localhost:3030/data/members', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json',
                        'X-Authorization' : userInfo.getToken()
                    },
                    body : JSON.stringify({
                        teamId : data._id
                    })
                })
                .then(res => res.json())
                .then(data => data);

                await fetch('http://localhost:3030/data/members' + `/${membership._id}`, {
                    method : 'PUT',
                    headers : {
                        'content-type' : 'application/json',
                        'X-Authorization' : userInfo.getToken()
                    },
                    body : JSON.stringify({
                        status : 'member'
                    })
                });

                page.redirect(`/details/${data._id}`);
                
            })
            .catch(err => {
                document.querySelector('#create-form > div.error').style.display = 'block';
            });

            if(team){
                
                
            }


    } else {
        document.querySelector('#create-form > div.error').style.display = 'block';
    }
}

async function onLoginSubmit(evt) {
    debugger;
    evt.preventDefault();

    let formData = new FormData(evt.currentTarget);

    let { email, password } = Object.fromEntries(formData);

    await requests.user.login(email, password)
        .then(res => {
            if (!res.ok) {
                throw new Error();
            }
            return res.json();
        })
        .then(user => {
            sessionStorage.setItem('team-user', JSON.stringify(user));
            page.redirect('/');
        })
        .catch(err => {
            document.querySelector('#login-form > div.error').style.display = 'block';
        })



}

async function onRegisterSubmit(evt) {
    debugger;
    evt.preventDefault();
    let formData = new FormData(evt.currentTarget);

    let { email, username, password, repass } = Object.fromEntries(formData);

    if (isValidRegister(email, username, password, repass)) {
        let userInfo = {
            email,
            username,
            password
        };

        requests.user.register(userInfo)
            .then(res => {
                if (!res.ok) {
                    throw new Error();
                }
                return res.json();
            })
            .then(data => {
                sessionStorage.setItem('team-user', JSON.stringify(data));
                page.redirect('/');
            })
            .catch(err => {
                document.querySelector('#register-form > div.error').style.display = 'block';
            })
    } else {
        document.querySelector('#register-form > div.error').style.display = 'block';
    }
}

function onEditSubmit(evt) {
    evt.preventDefault();

    let formData = new FormData(evt.currentTarget);

    let { name, logoUrl, description} = Object.fromEntries(formData);

    if(isValidCreatingOrEditing(name, description, logoUrl)){
        let item = {
            name,
            description,
            logoUrl,
            id : evt.currentTarget.getAttribute('teamId')
        }

        requests.items.edit(item)
        .then(res => {
            if(!res.ok){
                throw new Error();
            }
            page.redirect(`/details/${item.id}`)
        })
        .catch(err => {
            document.querySelector('#edit-form > div.error').style.display = 'block';
        })
    } else {
        document.querySelector('#edit-form > div.error').style.display = 'block';
    }
}


export const event = {
    onCreateSubmit,
    onLoginSubmit,
    onRegisterSubmit,
    onEditSubmit
}

function isValidRegister(email, username, password, repeatPassword) {

    let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return emailRegex.test(email) && username.length > 2 && password.length > 2 && password === repeatPassword;
}

function isValidCreatingOrEditing(name, desc, url) {
    return name.length > 3 && url && desc.length > 9;
}