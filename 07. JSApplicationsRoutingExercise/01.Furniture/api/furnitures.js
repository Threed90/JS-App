import { url } from "../util/urls.js";
import { userInfo } from "../util/userInfo.js";


function createNew(furniture) {

    return fetch(url.forFurnitures, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': userInfo.getToken()
        },
        body: JSON.stringify(furniture)
    });
}

/**
 * @description Asynchronous operation.
 * @returns array of furniture objects as promise
 */
async function getAll(){
    return await fetch(url.forFurnitures)
    .then(res => res.json())
    .then(furnitures => furnitures);
}

/**
 * @description Asynchronous operation.
 * @returns single furniture object as promise
 */
async function getById(id){
    return await fetch(url.forFurnitures + `/${id}`)
    .then(res => res.json())
    .then(furnitures => furnitures);
}

function update(furniture){

    return fetch(url.forFurnitures + `/${furniture._id}`, {
        method : 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': userInfo.getToken()
        },
        body: JSON.stringify(furniture)
    });
}

function deleteById(id){
    return fetch(url.forFurnitures + `/${id}`, {
        method : 'DELETE',
        headers: {
            'X-Authorization': userInfo.getToken()
        }
    });
}

/**
 * @description Asynchronous operation.
 * @param {string}
 * @returns array of furniture objects as promise
 */
async function getByUserId(userId){
    return await fetch(url.forFurnitures + `?where=_ownerId%3D%22${userId}%22`)
    .then(res => res.json())
    .then(furnitures => furnitures);
}

export const furnitures = {
    createNew,
    getAll,
    getById,
    getByUserId,
    update,
    deleteById
}