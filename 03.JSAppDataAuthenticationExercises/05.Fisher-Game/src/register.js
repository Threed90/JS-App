let form;
let p;
renderData();

function renderData(){
    form = document.querySelector('form#register');
    p = form.querySelector('.notification');
    loadRegistrationEvent();
}

function loadRegistrationEvent(){
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
                    window.location.href = './successfulRegistration.html';
                })
                .catch(err => {
                    p.textContent = err.message;
                });
        }
    });
}

