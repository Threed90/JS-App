function userLogin() {
    let url = 'http://localhost:3030/users/login';


    let formElement = document.querySelector('form');

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let userObj = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
            .then(res => {
                if(res.ok == false){
                    throw new Error();
                }

                return res.json();
            })
            .then((user) => {
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = './successfulLogin.html';
                
            })
            .catch(err => {
                window.location.href = './loginError.html';
                
            })

            
    });

    
}


 window.addEventListener('load', userLogin)