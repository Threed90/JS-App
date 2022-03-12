let main;
let user;
let section;
let logoutBtn;
let loginBtn;
let registerBtn;
let mainFeildSet;
let catchesDiv;
let form;
let welcome;

renderData();


function renderData() {

    getLoginPage();

    loadButtonEvents();
}

function getLoginPage() {
    user = JSON.parse(localStorage.getItem('user'));
    main = document.querySelector('main');
    form = document.getElementById('addForm');
    section = document.getElementById('home-view');
    welcome = document.querySelector('.email span');

    mainFeildSet = document.getElementById('main');
    mainFeildSet.style.display = 'none';

    catchesDiv = document.getElementById('catches');

    logoutBtn = document.getElementById('logout');
    loginBtn = document.getElementById('login');
    registerBtn = document.getElementById('register');

    main.insertBefore(createCustomElement('div', { id: 'msgDiv', textContent: 'Click to load catches' }), main.firstChild);

    if (user) {
        registerBtn.style.display = 'none';
        loginBtn.style.display = 'none';
        form.querySelector('.add').disabled = false;
        welcome.textContent = user.email;
    } else {
        logoutBtn.style.display = 'none';
    }
}

function loadButtonEvents() {

    logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = './index.html';
    });

    form.addEventListener('submit', (e) => {
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
                formData.reset();
            });
    });

    section.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {

            if (e.target.className == 'load' && e.target.textContent == 'Load') {
                let msgDiv = e.target.parentNode.parentNode.parentNode.querySelector('#msgDiv');

                if (msgDiv) {
                    msgDiv.remove();
                }

                catchesDiv.textContent = null;
                mainFeildSet.style.display = 'inline-table';

                fetch('http://localhost:3030/data/catches')
                    .then(res => res.json())
                    .then(data => {
                        for (const angler of data) {
                            let catchDiv = createACatch(angler)
                            catchesDiv.appendChild(catchDiv);
                        }
                    });


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
    });

    
}

function createACatch(angler) {

    let isButtonDidabled = '';

    if(user && user._id == angler._ownerId){
        isButtonDidabled = null;
    }

    return createCustomElement('div', { class: 'catch' }, [{
        type: 'label',
        attributes: { textContent: 'Angler' }
    }, {
        type: 'input',
        attributes: {
            type: 'text',
            value: angler.angler,
            class: 'angler'
        }
    }, {
        type: 'label',
        attributes: { textContent: 'Weight' }
    }, {
        type: 'input',
        attributes: {
            type: 'text',
            value: angler.weight,
            class: 'weight'
        }
    }, {
        type: 'label',
        attributes: { textContent: 'Species' }
    }, {
        type: 'input',
        attributes: {
            type: 'text',
            value: angler.species,
            class: 'species'
        }
    }, {
        type: 'label',
        attributes: { textContent: 'Location' }
    }, {
        type: 'input',
        attributes: {
            type: 'text',
            value: angler.location,
            class: 'location'
        }
    }, {
        type: 'label',
        attributes: { textContent: 'Bait' }
    }, {
        type: 'input',
        attributes: {
            type: 'text',
            value: angler.bait,
            class: 'bait'
        }
    }, {
        type: 'label',
        attributes: { textContent: 'Capture Time' }
    }, {
        type: 'input',
        attributes: {
            type: 'number',
            value: angler.captureTime,
            class: 'captureTime'
        }
    }, {
        type: 'button',
        attributes: {
            class: 'update',
            'data-id': angler._id,
            disabled: isButtonDidabled,
            textContent : 'Update'
        }
    }, {
        type: 'button',
        attributes: {
            class: 'delete',
            'data-id': angler._id,
            disabled: isButtonDidabled,
            textContent : 'Delete'
        }
    }
    ]);
}
// <div class="catch">
//     <label>Capture Time</label>
//     <input type="number" class="captureTime" value="80">
//     <button class="update" data-id="07f260f4-466c-4607-9a33-f7273b24f1b4">Update</button>
//     <button class="delete" data-id="07f260f4-466c-4607-9a33-f7273b24f1b4">Delete</button>
// </div>
function createCustomElement(type, attrs, childrenElements, ...children) {
    let element = document.createElement(type);

    if (attrs) {
        for (const key in attrs) {

            if(attrs[key] == null){
                element.removeAttribute(key);
                continue;
            }

            if (key == 'textContent') {
                element.textContent = attrs[key]
                continue;
            }
            if (key == 'class') {
                element.classList.add(attrs[key]);
                continue;
            }
            element.setAttribute(key, attrs[key]);
        }
    }

    if (childrenElements) {
        for (let index = 0; index < childrenElements.length; index++) {
            let currentChild = childrenElements[index];
            let child = createCustomElement(currentChild.type, currentChild.attributes, currentChild.classes, currentChild?.childrenElements);
            element.appendChild(child);
        }
    }

    if (children[0])
        for (let index = 0; index < children.length; index++) {
            element.appendChild(children[index]);
        }

    return element;
}
