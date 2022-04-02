import {url} from '../util/urls.js';
import {userInfo} from '../util/userInfo.js'

async function getAll(teamId){

   
    return await fetch(url.getMembersUrl())
    .then(res => res.json())
    .then(items => items)
}

export const members = {
    getAll
}