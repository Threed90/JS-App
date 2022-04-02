import {url} from '../util/urls.js';
import {userInfo} from '../util/userInfo.js'

async function getAll(){
    return await fetch(url.getTeamsUrl())
    .then(res => res.json())
    .then(items => items)
}

async function getById(id){
    return await fetch(url.getTeamsUrl() + `/${id}`) 
    .then(res => res.json())
    .then(item => item);
}

function create(item){
    return fetch(url.getTeamsUrl(), {
        method : 'POST',
        headers : {
            'content-type' : 'application/json',
            'X-Authorization' : userInfo.getToken()
        },
        body : JSON.stringify(item)
    });
}

function deleteById(id){
    return fetch(url.getTeamsUrl() + `/${id}`, {
        method : 'DELETE',
        headers : { 'X-Authorization' : userInfo.getToken() }
    });
}

/**
 * 
 * @param {object} object should contain id of entity
 */
function edit(item){
    return fetch(url.getTeamsUrl() + `/${item.id}`, {
        method : 'PUT',
        headers : {
            'content-type' : 'application/json',
            'X-Authorization' : userInfo.getToken()
        },
        body : JSON.stringify(item)
    });
}

export const items = {
    getAll,
    getById,
    create,
    deleteById,
    edit
};