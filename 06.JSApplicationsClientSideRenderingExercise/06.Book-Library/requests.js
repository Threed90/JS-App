const url = 'http://localhost:3030/jsonstore/collections/books';

async function getAllBooks(){
    return Object.entries(await fetch(url)
    .then(res => res.json())
    .then(books => books));
}

function createABook(title, author){
    fetch(url, {
        method : 'POST',
        headers : { 'content-type' : 'application/json' },
        body : JSON.stringify({
            author,
            title
        })
    });
}

function updateABook(id, title, author){
    fetch(`${url}/${id}`, {
        method : 'PUT',
        headers : { 'content-type' : 'application/json' },
        body : JSON.stringify({
            author,
            title
        })
    });
}

async function deleteABook(id){
    await fetch(`${url}/${id}`, {
        method : 'DELETE'
    });
}

export const requests = {
    getAllBooks,
    createABook,
    updateABook,
    deleteABook
}