async function getMovies() {
    let movies = await fetch('http://localhost:3030/data/movies')
        .then(res => res.json())
        .then(data => data);

    return movies;
}

async function getAMovie(movieId) {
    let movie = await fetch(`http://localhost:3030/data/movies/${movieId}`)
        .then(res => res.json())
        .then(data => data);

    return movie;
}

async function getLikes(movieId) {
    let numberOflikes = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`)
        .then(res => res.json())
        .then(likes => likes);

    return numberOflikes;
}
function addALike(movieId) {

    ///maybe need to add ownerId to body request
    fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': JSON.parse(sessionStorage.getItem('user-movie-app')).accessToken
        },
        body: JSON.stringify({
            movieId
        })
    });
}

async function removeALike(movieId, userId) {
    let like = await getSpecificLike(movieId, userId);

    await fetch(`http://localhost:3030/data/likes/${like[0]._id}`, {
        method: 'DELETE',
        headers: { 'X-Authorization': JSON.parse(sessionStorage.getItem('user-movie-app')).accessToken }
    });
}

async function loginUser(userInfo) {
    let isLoged = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(userInfo)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Unable to log in!')
            }
            return res.json();
        })
        .then(user => {
            sessionStorage.setItem('user-movie-app', JSON.stringify(user));
            alert('Successful login!');
            return true;
        })
        .catch(err => {
            alert(err.message);
        });
    return isLoged;
}

async function registerUser(userInfo) {
    return await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(userInfo)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Email aready exists!');
            }
            alert('Successful registration!');
            return '/login';
        })
        .catch(err => {
            alert(err.message);
            return '/register';
        });
}

async function getSpecificLike(movieId, userId) {
    let like = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`)
        .then(res => res.json())
        .then(data => data);

    return like;
}

async function createMovie(movie) {
    debugger;
    let user = JSON.parse(sessionStorage.getItem('user-movie-app'));

    await fetch(`http://localhost:3030/data/movies`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            title : movie.title,
            description : movie.description,
            img : movie.img
        })
    })
    .then(res => {
        debugger;
        if(!res.ok){
            throw new Error('The movie is not added!');
        }
        alert('The movie is added successfully!');
    })
    .catch(err => err);
}

function editMovie(movieId, movie) {
    fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': JSON.parse(sessionStorage.getItem('user-movie-app')).accessToken
        },
        body: JSON.stringify(movie)
    })
    .then(res => {
        if(res.ok){
            alert('Successful edit!');
        } else {
            alert('Unsuccessful edit!');
        }
    });
}

async function deleteMovie(movieId) {
    await fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': JSON.parse(sessionStorage.getItem('user-movie-app')).accessToken
        }
    })
    .then(res => {
        if(res.ok){
            alert('The movie is deleted');
        } else {
            alert('Can not delete the movie!');
        }
    });
}

function logout(){
    sessionStorage.removeItem('user-movie-app');
   alert('Successful logout!');
}

export const requests = {
    getMovies,
    getAMovie,
    getLikes,
    addALike,
    removeALike,
    getSpecificLike,
    loginUser,
    registerUser,
    createMovie,
    editMovie,
    deleteMovie,
    logout
}