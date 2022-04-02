let url = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function getItems(){
    return Object.values(await fetch(url)
    .then(res => res.json())
    .then(items => items));
}


function addItem(itemText){
    fetch(url, {
        method : 'POST',
        headers : { 'content-type' : 'application/json'},
        body : JSON.stringify({ text : itemText})
    })
}

export const requests = {
    getItems,
    addItem
}