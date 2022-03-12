function solve(){
    let form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let obj = {
            email : formData.get('email'),
            password : formData.get('password')
        }

        if(formData.get('rePass') == formData.get('password')){
            fetch('http://localhost:3030/users/register', {
                method : 'POST',
                headers : { 'content-type' : 'application/json' },
                body : JSON.stringify(obj)
            })
            .then(res => {
                if(!res.ok){
                    throw new Error('Email already exist!');
                }
                alert('Successful registration!');
                window.location.href = './login.html';
            })
            .catch(err => {
                alert(err.message);
            })

        } else {
            alert('Password does not match!')
        }
    })
}

solve();