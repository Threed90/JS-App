function attachEvents() {
    let weatherSymbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    };

    let forecastElement = document.getElementById('forecast');
    let currentElement = document.getElementById('current');
    let upcomingElement = document.getElementById('upcoming');

    let buttonElement = document.getElementById('submit');
    let locationElement = document.getElementById('location');

    buttonElement.addEventListener('click', async () => {
        let cityName = locationElement.value;

        let locationCode = await getCityCode(cityName, currentElement, upcomingElement);

        if (locationCode) {
            let todayForcastURL = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`;
            let upcommingURL = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`;

            fetch(todayForcastURL)
                .then(res => res.json())
                .then(data => {
                    showCurrentForecast(currentElement, data, weatherSymbols);
                });

            fetch(upcommingURL)
                .then(res => res.json())
                .then(data => {
                    showUpcommingForecast(upcomingElement, data, weatherSymbols);
                });
        }
        
        forecastElement.style.display = '';
    });
}

async function getCityCode(cityName, currentElement, upcomingElement){
    let code = await fetch('http://localhost:3030/jsonstore/forecaster/locations')
    .then(res => {
        if (res.ok == false) {
            throw new Error('Error');
        }
        return res.json();
    })
    .then(data => {
        let obj = data.find(l => l.name.toLowerCase() == cityName.toLowerCase() || l.code.toLowerCase() == cityName.toLowerCase());

        if (!obj) {
            throw new Error('Error');
        }
        return obj.code;
    })
    .catch(err => {
        showError(err.message, currentElement, upcomingElement)
    });

    return code;
}

function showError(msg, currentElement, upcomingElement) {
    upcomingElement.textContent = null;
    currentElement.textContent = null;
    let errDiv = document.createElement('div');
    errDiv.classList.add('label');
    errDiv.textContent = 'Error'; // use msg parameter for diffrent error msg displaying
    currentElement.appendChild(errDiv);
}

function showCurrentForecast(currentElement, data, weatherSymbols) {
    currentElement.textContent = null;

    let labelElement = document.createElement('div');
    labelElement.classList.add('label');
    labelElement.textContent = 'Current conditions';
    currentElement.appendChild(labelElement);

    let forecastsElement = document.createElement('div');
    forecastsElement.classList.add('forecasts');

    let conditionSymbolElement = document.createElement('span');
    conditionSymbolElement.classList.add('condition', 'symbol'); //maybe array
    conditionSymbolElement.textContent = weatherSymbols[data.forecast.condition];
    forecastsElement.appendChild(conditionSymbolElement);

    let conditionElement = document.createElement('span');
    conditionElement.classList.add('condition');

    let cityDataElement = document.createElement('span');
    cityDataElement.classList.add('forecast-data');
    cityDataElement.textContent = data.name;
    conditionElement.appendChild(cityDataElement);

    let degreesDataElement = document.createElement('span');
    degreesDataElement.classList.add('forecast-data');
    degreesDataElement.textContent = `${data.forecast.low}${weatherSymbols.Degrees}/${data.forecast.high}${weatherSymbols.Degrees}`;
    conditionElement.appendChild(degreesDataElement);

    let conditionDataElement = document.createElement('span');
    conditionDataElement.classList.add('forecast-data');
    conditionDataElement.textContent = data.forecast.condition;
    conditionElement.appendChild(conditionDataElement);

    forecastsElement.appendChild(conditionElement);
    currentElement.appendChild(forecastsElement);
}

function showUpcommingForecast(upcomingElement, data, weatherSymbols) {
    upcomingElement.textContent = null;

    let labelElement = document.createElement('div');
    labelElement.classList.add('label');
    labelElement.textContent = 'Three-day forecast';
    upcomingElement.appendChild(labelElement);

    let forecastInfoElement = document.createElement('div');
    forecastInfoElement.classList.add('forecast-info');

    for (const forecast of data.forecast) {
        let upcomingSpanElement = document.createElement('span');
        upcomingSpanElement.classList.add('upcoming');

        let symbolDataElement = document.createElement('span');
        symbolDataElement.classList.add('symbol');
        symbolDataElement.textContent = weatherSymbols[forecast.condition];
        upcomingSpanElement.appendChild(symbolDataElement);

        let degreesDataElement = document.createElement('span');
        degreesDataElement.classList.add('forecast-data');
        degreesDataElement.textContent = `${forecast.low}${weatherSymbols.Degrees}/${forecast.high}${weatherSymbols.Degrees}`;
        upcomingSpanElement.appendChild(degreesDataElement);

        let conditionDataElement = document.createElement('span');
        conditionDataElement.classList.add('forecast-data');
        conditionDataElement.textContent = forecast.condition;
        upcomingSpanElement.appendChild(conditionDataElement);

        forecastInfoElement.appendChild(upcomingSpanElement);
    }
    upcomingElement.appendChild(forecastInfoElement);
}

attachEvents();