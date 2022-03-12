//These buttons are anchor tags
let homeBtn;
let logoutBtn;
let loginBtn;
let registerBtn;
let welcomeNameElement;
let user;
let main;

window.addEventListener('load', () => {
    homeBtn = document.getElementById('home');
    logoutBtn = document.getElementById('logout');
    loginBtn = document.getElementById('login');
    registerBtn = document.getElementById('register');

    welcomeNameElement = document.querySelector('nav p.email span');
    user = JSON.parse(localStorage.getItem('user'));

    main = document.querySelector('body main');
    renderData();
});

function renderData() {

    getHomePage();

    homeBtn.addEventListener('click', () => {
        getHomePage();
    });

    loginBtn.addEventListener('click', () => {
        getLoginPage();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        getHomePage();
    });

    registerBtn.addEventListener('click', () => {
        getRegisterPage();
        
    });

}

function getRegisterPage() {
    main.textContent = null;
    let section = document.createElement('section');
    section.setAttribute('id', 'register-view');

    let h2 = document.createElement('h2');
    h2.textContent = 'Register';
    section.appendChild(h2);

    let form = document.createElement('form');
    form.setAttribute('id', 'register');

    let emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email: ';
    let emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('name', 'email');
    emailLabel.appendChild(emailInput);
    form.appendChild(emailLabel);

    let passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password: ';
    let passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('name', 'password');
    passwordLabel.appendChild(passwordInput);
    form.appendChild(passwordLabel);

    let repeatLabel = document.createElement('label');
    repeatLabel.textContent = 'Repeat: ';
    let repeatInput = document.createElement('input');
    repeatInput.setAttribute('type', 'password');
    repeatInput.setAttribute('name', 'rePass');
    repeatLabel.appendChild(repeatInput);
    form.appendChild(repeatLabel);

    let p = document.createElement('p');
    p.classList.add('notification');
    form.appendChild(p);

    let button = document.createElement('button');
    button.textContent = 'Register';
    form.appendChild(button);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let userData = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        if (userData.password != formData.get('rePass')) {
            p.textContent = 'Password does not match or email already exists!'
        } else {

            fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Password does not match or email already exists!')
                    }
                    return res.json()
                })
                .then(user => {
                    //localStorage.setItem('user', JSON.stringify(user));
                    main.textContent = null;
                    let msgDiv = document.createElement('div');
                    msgDiv.textContent = 'Successful registration!'
                    msgDiv.style.fontSize = '50px';
                    main.appendChild(msgDiv);
                    

                })
                .catch(err => {
                    p.textContent = err.message;
                });
        }
    });

    section.appendChild(form);
    main.appendChild(section);
}


function getLoginPage() {
    main.textContent = null;
    let section = document.createElement('section');
    section.setAttribute('id', 'login-view');

    let h2 = document.createElement('h2');
    h2.textContent = 'Login';
    section.appendChild(h2);

    let form = document.createElement('form');
    form.setAttribute('id', 'login');

    let emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email: ';
    let emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('name', 'email');
    emailLabel.appendChild(emailInput);
    form.appendChild(emailLabel);

    let passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password: ';
    let passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('name', 'password');
    passwordLabel.appendChild(passwordInput);
    form.appendChild(passwordLabel);

    let p = document.createElement('p');
    p.classList.add('notification');
    form.appendChild(p);

    let button = document.createElement('button');
    button.textContent = 'Login';
    form.appendChild(button);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let userData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Wrong email or password!')
                }
                return res.json()
            })
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                getHomePage();

            })
            .catch(err => {
                p.textContent = err.message;
            });
    });

    section.appendChild(form);
    main.appendChild(section);

}

function getHomePage() {
    main.textContent = null;
    let section = document.createElement('section');
    section.setAttribute('id', 'home-view');

    let fieldSet = document.createElement('fieldset');
    fieldSet.setAttribute('id', 'main');
    fieldSet.style.display = 'none';
    section.appendChild(fieldSet);

    let aside = createAsidePanel();

    let divMsg = document.createElement('div');
    divMsg.setAttribute('id', 'msgDiv');
    divMsg.textContent = 'Click to load catches';
    main.appendChild(divMsg);
    user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        logoutBtn.style.display = 'inline-block';
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        welcomeNameElement.textContent = user.email;
    } else {
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        welcomeNameElement.textContent = 'guest';

    }

    section.appendChild(aside);
    main.appendChild(section);

    section.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {

            if (e.target.className == 'load' && e.target.textContent == 'Load') {
                let msgDiv = e.target.parentNode.parentNode.parentNode.querySelector('#msgDiv');

                if (msgDiv) {
                    msgDiv.remove();
                }

                let fieldSet = e.currentTarget.querySelector('#main');
                fieldSet.textContent = null;
                let legend = document.createElement('legend');
                legend.textContent = 'Catches';
                fieldSet.appendChild(legend);

                let catchesDiv = document.createElement('div');
                catchesDiv.setAttribute('id', 'catches');

                fetch('http://localhost:3030/data/catches')
                    .then(res => res.json())
                    .then(data => {
                        for (const angler of data) {
                            let catchDiv = createACatch(angler);
                            catchesDiv.appendChild(catchDiv);
                        }

                        if (data.length > 0) {
                            fieldSet.appendChild(catchesDiv);
                            fieldSet.style.display = 'inline-table';
                        }
                    })
            } else if (e.target.className == 'update' && e.target.textContent == 'Update') {
                let id = e.target.getAttribute('data-id');
                let angler = e.target.parentNode.querySelector('input[class="angler"]').value;
                let weight = e.target.parentNode.querySelector('input[class="weight"]').value;
                let species = e.target.parentNode.querySelector('input[class="species"]').value;
                let location = e.target.parentNode.querySelector('input[class="location"]').value;
                let bait = e.target.parentNode.querySelector('input[class="bait"]').value;
                let captureTime = e.target.parentNode.querySelector('input[class="captureTime"]').value;

                if (angler && weight && species && location && bait && captureTime) {
                    fetch(`http://localhost:3030/data/catches/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            'X-Authorization': user.accessToken
                        },
                        body: JSON.stringify({
                            angler,
                            weight,
                            species,
                            location,
                            bait,
                            captureTime
                        })
                    })
                        .then(res => res.json())
                        .then(data => {

                            let div = createACatch(data);
                            e.target.parentNode.replaceWith(div);
                        });
                }

            } else if (e.target.className == 'delete' && e.target.textContent == 'Delete') {
                let id = e.target.getAttribute('data-id');

                fetch(`http://localhost:3030/data/catches/${id}`, {
                    method: 'DELETE',
                    headers: { 'X-Authorization': user.accessToken }
                })
                    .then(res => {
                        if (res.ok) {
                            e.target.parentNode.remove();
                        }
                    });
            }
        }
    })
}

function createACatch(angler) {
    let div = document.createElement('div');
    div.classList.add('catch');

    let anglerLabel = document.createElement('label');
    anglerLabel.textContent = 'Angler';
    div.appendChild(anglerLabel);

    let anglerInput = document.createElement('input');
    anglerInput.setAttribute('type', 'text');
    anglerInput.classList.add('angler');
    anglerInput.setAttribute('value', angler.angler);
    div.appendChild(anglerInput);

    let weightLabel = document.createElement('label');
    weightLabel.textContent = 'Weight';
    div.appendChild(weightLabel);

    let weightInput = document.createElement('input');
    weightInput.setAttribute('type', 'text');
    weightInput.classList.add('weight');
    weightInput.setAttribute('value', angler.weight);
    div.appendChild(weightInput);

    let speciesLabel = document.createElement('label');
    speciesLabel.textContent = 'Species';
    div.appendChild(speciesLabel);

    let speciesInput = document.createElement('input');
    speciesInput.setAttribute('type', 'text');
    speciesInput.classList.add('species');
    speciesInput.setAttribute('value', angler.species);
    div.appendChild(speciesInput);

    let locationLabel = document.createElement('label');
    locationLabel.textContent = 'Location';
    div.appendChild(locationLabel);

    let locationInput = document.createElement('input');
    locationInput.setAttribute('type', 'text');
    locationInput.classList.add('location');
    locationInput.setAttribute('value', angler.location);
    div.appendChild(locationInput);

    let baitLabel = document.createElement('label');
    baitLabel.textContent = 'Bait';
    div.appendChild(baitLabel);

    let baitInput = document.createElement('input');
    baitInput.setAttribute('type', 'text');
    baitInput.classList.add('bait');
    baitInput.setAttribute('value', angler.bait);
    div.appendChild(baitInput);

    let captureTimeLabel = document.createElement('label');
    captureTimeLabel.textContent = 'Capture Time';
    div.appendChild(captureTimeLabel);

    let captureTimeInput = document.createElement('input');
    captureTimeInput.setAttribute('type', 'number');
    captureTimeInput.classList.add('captureTime');
    captureTimeInput.setAttribute('value', angler.captureTime);
    div.appendChild(captureTimeInput);

    let updateBtn = document.createElement('button');
    updateBtn.classList.add('update');
    updateBtn.setAttribute('data-id', angler._id);
    updateBtn.textContent = 'Update';

    if (user) {
        if (user._id == angler._ownerId) {
            updateBtn.removeAttribute('disabled')
        } else {
            updateBtn.setAttribute('disabled', "");
        }
    } else {
        updateBtn.setAttribute('disabled', "");
    }
    div.appendChild(updateBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute('data-id', angler._id);
    deleteBtn.textContent = 'Delete';

    if (user) {
        if (user._id == angler._ownerId) {
            deleteBtn.removeAttribute('disabled')
        } else {
            deleteBtn.setAttribute('disabled', "");
        }
    } else {
        deleteBtn.setAttribute('disabled', "");
    }
    div.appendChild(deleteBtn);

    return div;
}


function createAsidePanel() {
    let aside = document.createElement('aside');

    let loadBtn = document.createElement('button');
    loadBtn.classList.add('load');
    loadBtn.textContent = 'Load';
    aside.appendChild(loadBtn);

    let addForm = document.createElement('form');
    addForm.setAttribute('id', 'addForm');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let { angler, weight, species, location, bait, captureTime } = Object.fromEntries(formData);

        fetch('http://localhost:3030/data/catches', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            })
        })
            .then(res => res.json())
            .then(data => {
                let catchesElement = document.getElementById('catches');

                let catchElement = createACatch(data)
                catchesElement.appendChild(catchElement);
            });
    });


    let fieldSet = document.createElement('fieldset');

    let legend = document.createElement('legend');
    legend.textContent = 'Add Catch';
    fieldSet.appendChild(legend);

    let anglerLabel = document.createElement('label');
    anglerLabel.textContent = 'Angler';
    fieldSet.appendChild(anglerLabel);

    let anglerInput = document.createElement('input');
    anglerInput.setAttribute('type', 'text');
    anglerInput.setAttribute('name', 'angler');
    anglerInput.classList.add('angler');
    fieldSet.appendChild(anglerInput);

    let weightLabel = document.createElement('label');
    weightLabel.textContent = 'Weight';
    fieldSet.appendChild(weightLabel);

    let weightInput = document.createElement('input');
    weightInput.setAttribute('type', 'number');
    weightInput.setAttribute('name', 'weight');
    weightInput.classList.add('weight');
    fieldSet.appendChild(weightInput);

    let speciesLabel = document.createElement('label');
    speciesLabel.textContent = 'Species';
    fieldSet.appendChild(speciesLabel);

    let speciesInput = document.createElement('input');
    speciesInput.setAttribute('type', 'text');
    speciesInput.setAttribute('name', 'species');
    speciesInput.classList.add('species');
    fieldSet.appendChild(speciesInput);

    let locationLabel = document.createElement('label');
    locationLabel.textContent = 'Location';
    fieldSet.appendChild(locationLabel);

    let locationInput = document.createElement('input');
    locationInput.setAttribute('type', 'text');
    locationInput.setAttribute('name', 'location');
    locationInput.classList.add('location');
    fieldSet.appendChild(locationInput);

    let baitLabel = document.createElement('label');
    baitLabel.textContent = 'Bait';
    fieldSet.appendChild(baitLabel);

    let baitInput = document.createElement('input');
    baitInput.setAttribute('type', 'text');
    baitInput.setAttribute('name', 'bait');
    baitInput.classList.add('bait');
    fieldSet.appendChild(baitInput);

    let captureTimeLabel = document.createElement('label');
    captureTimeLabel.textContent = 'Capture Time';
    fieldSet.appendChild(captureTimeLabel);

    let captureTimeInput = document.createElement('input');
    captureTimeInput.setAttribute('type', 'number');
    captureTimeInput.setAttribute('name', 'captureTime');
    captureTimeInput.classList.add('captureTime');
    fieldSet.appendChild(captureTimeInput);

    let addBtn = document.createElement('button');
    addBtn.classList.add('add');
    addBtn.textContent = 'Add'
    user = localStorage.getItem('user');
    if (!user) {
        addBtn.setAttribute('disabled', '');
    }


    fieldSet.appendChild(addBtn);

    addForm.appendChild(fieldSet);
    aside.appendChild(addForm);

    return aside;
}


