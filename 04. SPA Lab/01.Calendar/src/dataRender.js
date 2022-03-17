const sections = Array.from(document.querySelectorAll('body section'));

function showYears(){
    let neededSection = sections.find(s => s.id == 'years');
    hideData();
    neededSection.style.display = 'block';
}

function showMonths(yearId){
    let neededSection = sections.find(s => s.id == yearId);
    hideData();
    
    neededSection.style.display = 'block';
}

function showDays(monthId){
    let neededSection = sections.find(s => s.id == monthId);
    hideData();
    
    neededSection.style.display = 'block';
}

function hideData(){
    
    sections.forEach(e => {
        e.style.display = 'none';
    })
}

export const render = {
    
        showYears,
        showMonths,
        showDays
    
};