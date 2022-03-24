function getToken(){
    return getUserObj().accessToken;
}

function getUserObj(){
    return JSON.parse(sessionStorage.getItem('furniture-app-user'));
}

export const userInfo = {
    getToken,
    getUserObj
}