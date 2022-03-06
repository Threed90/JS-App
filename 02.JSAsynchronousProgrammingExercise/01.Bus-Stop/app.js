function getInfo() {
    let busIdElement = document.getElementById('stopId');

    let busNameDivElement = document.getElementById('stopName');
    let busesUlElement = document.getElementById('buses');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${busIdElement.value}`;

    fetch(url)
        .then(res => {
            if(res.ok == false){ //for 4** or 5** http status
                throw new Error('Error');
            }

            return res.json();
        })
        .then(data => {
            busIdElement.value = '';
            busNameDivElement.textContent = null;
            busesUlElement.textContent = null;

            busNameDivElement.textContent = data.name;

            for (const key in data.buses) {
                let liElement = document.createElement('li');
                liElement.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`;
                busesUlElement.appendChild(liElement);
            }
        })
        .catch(() => {

            busesUlElement.textContent = null;
            busNameDivElement.textContent = 'Error';
        })
}