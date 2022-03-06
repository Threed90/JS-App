function solve() {
    let infoSpanElement = document.querySelector('#info .info');
    let departButtonElement = document.getElementById('depart');
    let arriveButtonElement = document.getElementById('arrive');

    let currentId = 'depot';
    
    function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${currentId}`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            infoSpanElement.textContent = `Next stop ${data.name}`;
            departButtonElement.setAttribute('disabled', true);
            arriveButtonElement.removeAttribute('disabled');
        });
    }

    function arrive() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${currentId}`;
        
        fetch(url)
        .then(res => res.json())
        .then(data => {
            infoSpanElement.textContent = `Arriving at ${data.name}`;
            departButtonElement.removeAttribute('disabled')
            arriveButtonElement.setAttribute('disabled', true);
            currentId = data.next;
        });
    }

    return {
        depart,
        arrive
    };
}

let result = solve();