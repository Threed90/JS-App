function solve() {
    let form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let userObj = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch('http://localhost:3030/users/login', {
            method : 'POST',
            headers : { 'content-type' : 'application/json' },
            body : JSON.stringify(userObj)
        })
            .then(res => {
                if (res.ok == false) {
                    throw new Error('Unable to log! Wrong email or password');
                }
                return res.json();
            })
            .then(user => {
                localStorage.setItem('furnitureUser', JSON.stringify(user));
                window.location.href = './home.html';
            })
            .catch(err => {
                alert(err.message);
                console.error(err.message);
            });
    });

}
solve();