let user;
let logoutBtn;
let loginBtn;
let registerBtn;
let form;
let p;

renderData();


function renderData() {
    form = document.querySelector('form#login');
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
                window.location.href = './index.html';

            })
            .catch(err => {
                p.textContent = err.message;
            });
    });
    p = document.querySelector('#login .notification')

    logoutBtn = document.getElementById('logout');
    loginBtn = document.getElementById('login');
    registerBtn = document.getElementById('register');
    
    logoutBtn.style.display = 'none';
    getLoginPage();
}
