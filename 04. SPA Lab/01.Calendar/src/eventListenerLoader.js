import {render} from './dataRender.js';

let body = document.querySelector('body');
let yearsSection = document.getElementById('years');
const monthSections = [
    document.getElementById('year-2020'),
    document.getElementById('year-2021'),
    document.getElementById('year-2022'),
    document.getElementById('year-2023')];

let currentYear;
let currentMonth;
const monthNumber = {
    Jan: '1',
    Feb: '2',
    Mar: '3',
    Apr: '4',
    May: '5',
    Jun: '6',
    Jul: '7',
    Aug: '8',
    Sept: '9',
    Oct: '10',
    Nov: '11',
    Dec: '12'
};
export function loadEvents() {
    
    yearsSection.addEventListener('click', (e) => {
        currentYear = getCurrentValue(e.target)

        if(currentYear){
            render.showMonths(`year-${currentYear}`);
        }
    });
    
    monthSections.forEach(s => {
        s.addEventListener('click', (e) => {
            currentMonth = getCurrentValue(e.target);

            if(currentMonth){
                render.showDays(`month-${currentYear}-${monthNumber[currentMonth]}`);
            }
        });
    });

    body.addEventListener('click', (e) => {
        if(e.target.tagName == 'CAPTION'){
            let section = e.target.parentNode.parentNode;

            if(section.className == 'daysCalendar'){
                render.showMonths(`year-${currentYear}`);
            } else if (section.className == 'monthCalendar'){
                render.showYears();
            } else {
                render.showYears();
            }
        }
    });
}

function getCurrentValue(element) {
    if (element.className == 'day') {
        return element.querySelector('div.date').textContent;
    } else if (element.className == 'date') {
        return element.textContent;
    }
}