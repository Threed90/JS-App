let url = 'http://localhost:3030/jsonstore/advanced/table';

export async function getRecords() {
    
    return Object.values(
        await fetch(url)
            .then(res => res.json())
            .then(records => records));
}