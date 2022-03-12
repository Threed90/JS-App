function solve() {
    let tbody = document.querySelector('tbody');

    let user = JSON.parse(localStorage.getItem('furnitureUser'));

    if (user) {
        window.location.href = './homeLogged.html';
    } else {
        fetch('http://localhost:3030/data/furniture')
            .then(res => res.json())
            .then(data => {
                tbody.textContent = null;
                for (const row of data) {
                    let tr = createCustomElement('tr', null,
                        createCustomElement('td', null, createCustomElement('img', { src: row.img })),
                        createCustomElement('td', null, createCustomElement('p', { textContent: row.name })),
                        createCustomElement('td', null, createCustomElement('p', { textContent: row.price })),
                        createCustomElement('td', null, createCustomElement('p', { textContent: row.factor })),
                        createCustomElement('td', null, createCustomElement('input', { type: 'checkbox', disabled: '' })));

                    tbody.appendChild(tr);
                }
            });
    }
}


solve();

function createCustomElement(type, attrs, ...children) {
    let element = document.createElement(type);

    if (attrs) {
        for (const key in attrs) {

            if (attrs[key] == null) {
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
            if (key == 'removeClass') {
                element.classList.remove(attrs[key])
            }
            element.setAttribute(key, attrs[key]);
        }
    }

    if (children.length > 0 && children[0])
        for (let index = 0; index < children.length; index++) {
            element.appendChild(children[index]);
        }

    return element;
}
