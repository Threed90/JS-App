function attachEvents() {
    let ulElement = document.getElementById('phonebook');
    let loadBtn = document.getElementById('btnLoad');

    //input fields:
    let personInputElement = document.getElementById('person');
    let phoneInputElement = document.getElementById('phone');
    let createBtn = document.getElementById('btnCreate');


    //events:

    //load person-phone data
    loadBtn.addEventListener('click', (e) => {

        fetch('http://localhost:3030/jsonstore/phonebook')
            .then(res => res.json())
            .then(phones => {
                ulElement.textContent = null;
                for (const key in phones) {
                    let li = document.createElement('li');
                    li.textContent = `${phones[key].person}: ${phones[key].phone} `;

                    let button = document.createElement('button');
                    button.textContent = 'Delete';
                    button.id = key;
                    li.appendChild(button);
                    ulElement.appendChild(li);
                }
            })
    });

    //event delegation for deleting a phone contact
    ulElement.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {
            e.target.parentNode.remove();
            fetch(`http://localhost:3030/jsonstore/phonebook/${e.target.id}`, {
                method: 'DELETE'
            });
        }
    });

    // create new phone contact
    createBtn.addEventListener('click', (e) => {
        let person = personInputElement.value;
        let phone = phoneInputElement.value;

        let regex = /\+{0,1}(\d+\s{0,1})+/
        if (person && regex.test(phone)) {
            fetch('http://localhost:3030/jsonstore/phonebook', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    person,
                    phone
                })
            })
                .then(res => res.json())
                .then(per => {
                    
                    let li = document.createElement('li');
                    li.textContent = `${per.person}: ${per.phone} `;

                    let button = document.createElement('button');
                    button.textContent = 'Delete';
                    button.id = per._id;
                    li.appendChild(button);
                    ulElement.appendChild(li);

                    personInputElement.value = '';
                    phoneInputElement.value = '';
                })
        }
    })
}

attachEvents();