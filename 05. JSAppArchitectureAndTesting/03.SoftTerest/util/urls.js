function getLoginUrl(){
    return 'http://localhost:3030/users/login';
}

function getRegisterUrl(){
    return 'http://localhost:3030/users/register';
}

function getLogoutUrl(){
    return 'http://localhost:3030/users/logout';
}

function getBaseUrl(){
    return 'http://localhost:3030';
}

function getAppUrl(){
    return `${getBaseUrl()}/data/ideas`;
}

function appendToAppUrl(subUrl){
    return `${getAppUrl()}${subUrl}`;
}

export const url ={
    getLoginUrl,
    getRegisterUrl,
    getLogoutUrl,
    getBaseUrl,
    getAppUrl,
    appendToAppUrl
}