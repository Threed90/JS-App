async function loadRepos() {
	let usernameElement = document.getElementById('username');
	let userName = usernameElement.value;
	let ulElement = document.getElementById('repos');
	// fetch('https://httpstat.us/404') 
    // .then(function(response) {
    //     if (!response.ok) { 
    //         throw Error(`${response.status}: ${response.statusText}.`);
    //     }
    //     return response;
    // }).then(function(response) {
    //     console.log('200 - ok');
    // }).catch(function(error) { 
    //     console.log(error.message);
    // });

	// return;
	let zzz = fetch(`https://api.github.com/users/${userName}/repos`)
	.then(async function(res){
		if(!res.ok){
			let text = res.status;
			let msg = await res.json();
			throw Error(`${text}: ${msg.message}.`);
		}
		return res;
	})
	.then(res => res.json())
	.then(data => {
		let dt = data.map(e => {return {'fullName' : e.full_name, 'url' : e.html_url};});
		ulElement.textContent = null;

		dt.forEach(element => {
			let liElement = document.createElement('li');
			let aElement = document.createElement('a');
			aElement.href = element.url;
			aElement.textContent = element.fullName;
			liElement.appendChild(aElement);
			ulElement.appendChild(liElement);
		});
	})
	.catch(err => {
		ulElement.textContent = null;
		usernameElement.value = '';
		let div = document.createElement('div');
		div.textContent = err.message;
		div.style.backgroundColor = 'green';
		div.style.display = 'block';
		div.style.width = '150px';
		div.style.margin = '0px 0px 0px 110px';
		ulElement.appendChild(div);
	});

	//console.log(zzz);
}