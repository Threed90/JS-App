function register() {
    let url = 'http://localhost:3030/users/register';

    let formElement = document.querySelector('form');

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        if (formData.get('password') != formData.get('rePass')) {
            window.location.href = './registrationError.html';
        } else {
            let userInfo = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
                .then(res => {
                    if (res.ok == false) {
                        throw new Error();
                    }

                    return res.json();
                })
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = './successfulRegister.html';
                })
                .catch(err => {
                    console.error(err.message);
                    window.location.href = './registrationError.html';
                });
        }

    });
}

window.addEventListener('load', register);