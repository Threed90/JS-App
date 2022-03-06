//Notes for examiner:
//There are few modification in CSS file for better responsive design - 
//Има няколко модификации по CSS файла за постигане на по-добър responsive design.
//Also it is used another REST API for profile images, not the giveн one in the project - 
//Използвано е друго API за снимки на профилите, а не предоставената в проекта.
//It is used event delegation - not a sigle event for each profile - 
//Азпозван е евент делегат - не отделен евент за всеки профил.

async function lockedProfile() {
    let mainElement = document.getElementById('main');

    await fetch('http://localhost:3030/jsonstore/advanced/profiles')
    .then(res => res.json())
    .then(async data => {
        let counter = 1;
        for (const key in data) {
            
            await appendProfileElment(mainElement, data[key], counter);
            counter++;
        }
    });
    
    mainElement.addEventListener('click', (e) => {
        
        if(e.target.tagName == 'BUTTON'){
            
            let parent = e.target.parentNode;
            let unlockElement = parent.querySelector('input[value="unlock"]');
            let hiddenElement = parent.querySelector('div:nth-of-type(1)');

            if(unlockElement.checked){
                if(e.target.textContent == 'Show more'){
                    e.target.textContent = 'Hide it';
                    hiddenElement.classList.remove('hiddenInfo');
                } else if(e.target.textContent == 'Hide it'){
                    e.target.textContent = 'Show more';
                    hiddenElement.classList.add('hiddenInfo');
                }
            }
        }
    });
}

async function appendProfileElment(mainElement, profile, counter){
    let profileDiv = document.createElement('div');
    profileDiv.classList.add('profile');
    if(counter % 3 == 1){

        profileDiv.setAttribute('id', 'down')
    }

    //Notes for the examiner:
    //api for avatar images and fetch API blob method for rendering the image
    //Images are not additionally created - they already exist as a part of the API provider
    //The usernames from the local server REST API match the names of avatars in multiavatar API
    let avatarImgURL = `https://api.multiavatar.com/${profile.username}.svg`;
    await fetch(avatarImgURL)
    .then(res => res.blob())
    .then(data => {
       
        var img = URL.createObjectURL(data);
        let imgElement = document.createElement('img');
        imgElement.classList.add('userIcon');
        imgElement.setAttribute('src', img);
        profileDiv.appendChild(imgElement);
    });

    let lockLabel = document.createElement('label');
    lockLabel.textContent = 'Lock ';
    profileDiv.appendChild(lockLabel);

    let lockRadioInput = document.createElement('input');
    lockRadioInput.setAttribute('type', 'radio');
    lockRadioInput.setAttribute('name', `user${counter}Locked`);
    lockRadioInput.setAttribute('value', 'lock');
    lockRadioInput.setAttribute('checked', '');
    profileDiv.appendChild(lockRadioInput);

    let unlockLabel = document.createElement('label');
    unlockLabel.textContent = ' Unlock ';
    profileDiv.appendChild(unlockLabel);

    let unlockRadioInput = document.createElement('input');
    unlockRadioInput.setAttribute('type', 'radio');
    unlockRadioInput.setAttribute('name', `user${counter}Locked`);
    unlockRadioInput.setAttribute('value', 'unlock');
    profileDiv.appendChild(unlockRadioInput);

    let br = document.createElement('br');
    profileDiv.appendChild(br);
    let hr = document.createElement('hr');
    profileDiv.appendChild(hr);

    let userNameLabel = document.createElement('label');
    userNameLabel.textContent = 'Username';
    profileDiv.appendChild(userNameLabel);

    let userNameInput = document.createElement('input');
    userNameInput.setAttribute('type', 'text');
    userNameInput.setAttribute('name', `user${counter}Username`);
    userNameInput.setAttribute('value', profile.username);
    userNameInput.setAttribute('disabled', '');
    userNameInput.setAttribute('readonly', '');
    profileDiv.appendChild(userNameInput);

    let hiddenDiv = document.createElement('div');
    hiddenDiv.classList.add('hiddenInfo');

    let hr2 = document.createElement('hr');
    hiddenDiv.appendChild(hr2);

    let emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    hiddenDiv.appendChild(emailLabel);

    let emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', `user${counter}Email`);
    emailInput.setAttribute('value', profile.email);
    emailInput.setAttribute('disabled', '');
    emailInput.setAttribute('readonly', '');
    hiddenDiv.appendChild(emailInput);

    let ageLabel = document.createElement('label');
    ageLabel.textContent = 'Age:';
    hiddenDiv.appendChild(ageLabel);

    let ageInput = document.createElement('input');
    ageInput.setAttribute('type', 'number');
    ageInput.setAttribute('name', `user${counter}Age`);
    ageInput.setAttribute('value', profile.age);
    ageInput.setAttribute('disabled', '');
    ageInput.setAttribute('readonly', '');
    hiddenDiv.appendChild(ageInput);

    profileDiv.appendChild(hiddenDiv);

    let button = document.createElement('button');
    button.textContent = 'Show more';
    profileDiv.appendChild(button);

    mainElement.appendChild(profileDiv);
}