function loadCommits() {
    let userElement = document.getElementById('username');
    let repoElement = document.getElementById('repo');
    let ul = document.getElementById('commits');

    let username = userElement.value;
    let repo = repoElement.value;

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
    .then(async (res) => {
        let responce = await res.json();
        if(!res.ok){
            throw new Error(`${res.status}: ${responce.message}`);
        }

        return responce;
    })
    .then(data => {
        ul.textContent = null;

        data.forEach(e => {
            let li = document.createElement('li');
            li.textContent = `${e.commit.author.name}: ${e.commit.message}`;
            ul.appendChild(li);
        });
    })
    .catch(err => {
        ul.textContent = null;
        let li = document.createElement('li');
        li.textContent = err.message;
        ul.appendChild(li);
    })
}