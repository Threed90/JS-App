function getUserObj(){
    return JSON.parse(sessionStorage.getItem('softterest-user'));
}

function getToken(){
    return getUserObj().accessToken;
}

export const userInfo = {
    getUserObj,
    getToken
}