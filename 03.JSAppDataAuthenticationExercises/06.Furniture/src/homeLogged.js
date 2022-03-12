function solve() {
    let tbody = document.querySelector('tbody');


    let user = JSON.parse(localStorage.getItem('furnitureUser'));

    if (!user) {
        //window.location.href = './home.html';
    } else {
        let form = document.querySelector('form');
        let buyBtn = document.querySelector('table + button');
        let orderAllBtn = document.querySelector('.orders button');

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
                        createCustomElement('td', null, createCustomElement('input', { type: 'checkbox' })));

                    tbody.appendChild(tr);
                }
            });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let formData = new FormData(e.currentTarget);

            let createdObj = {
                name: formData.get('name'),
                price: formData.get('price'),
                factor: formData.get('factor'),
                img: formData.get('img')
            };

            fetch('http://localhost:3030/data/furniture', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-Authorization': user.accessToken
                },
                body: JSON.stringify(createdObj)
            })
                .then(res => {
                    if (res.ok == false) {
                        throw new Error('Can not create such furniture!')
                    }
                    return res.json();
                })
                .then(furniture => {
                    let tr = createCustomElement('tr', null,
                        createCustomElement('td', null, createCustomElement('img', { src: furniture.img })),
                        createCustomElement('td', null, createCustomElement('p', { textContent: furniture.name })),
                        createCustomElement('td', null, createCustomElement('p', { textContent: furniture.price })),
                        createCustomElement('td', null, createCustomElement('p', { textContent: furniture.factor })),
                        createCustomElement('td', null, createCustomElement('input', { type: 'checkbox' })));

                    tbody.appendChild(tr);
                })
                .catch(err => {
                    alert(err.message);
                    console.error(err.message);
                })
        });

        buyBtn.addEventListener('click', (e) => {
            let trs = document.querySelectorAll('tbody tr');
            let trArr = Array.from(trs);

            trArr.forEach(el => {
                let checkbox = el.querySelector('td:last-child input');

                if (checkbox.checked) {
                    let img = el.querySelector('td:nth-of-type(1) img').src;
                    let name = el.querySelector('td:nth-of-type(2) p').textContent;
                    let price = el.querySelector('td:nth-of-type(3) p').textContent;
                    let factor = el.querySelector('td:nth-of-type(4) p').textContent;

                    let currentFuntinue = {
                        name,
                        price,
                        factor,
                        img
                    };

                    fetch('http://localhost:3030/data/orders', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'X-Authorization': user.accessToken
                        },
                        body : JSON.stringify(currentFuntinue)
                    })
                    .then(res => {
                        if(res.ok){
                            checkbox.checked = false;
                        }
                    })
                }
            });
        });

        orderAllBtn.addEventListener('click', (e) => {
            let furnitures = e.currentTarget.parentNode.querySelector('p:nth-of-type(1) span');
            let price = e.currentTarget.parentNode.querySelector('p:nth-of-type(2) span');

            let total = 0;
            let products = [];
            fetch(`http://localhost:3030/data/orders`)
            .then(res => res.json())
            .then(orders => {
                for (const order of orders) {
                    if(order._ownerId == user._id){
                        total += Number(order.price);
                        products.push(order.name);
                    }
                    
                }

                furnitures.textContent = products.join(', ') + ' $';
                price.textContent = total.toFixed(2);
            })
        });

        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            localStorage.removeItem('furnitureUser');
            window.location.href = './home.html';
        });
    }
}

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

solve();