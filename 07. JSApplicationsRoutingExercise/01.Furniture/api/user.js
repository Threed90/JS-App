import { url } from "../util/urls.js";
import { userInfo } from "../util/userInfo.js";

function login(email, pass) {
    return fetch(url.forUsers + '/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password: pass
        })
    });
}

function logout() {
    
    return fetch(url.forUsers + '/logout', {
        method : 'GET',
        headers : {'X-Authorization' : userInfo.getToken()}
    });
}

function register(userInfo) {
    return fetch(url.forUsers + '/register', {
        method : 'POST',
        headers : { 'content-type' : 'application/json' },
        body : JSON.stringify(userInfo)
    });
}

export const user = {
    login,
    logout,
    register
    };
