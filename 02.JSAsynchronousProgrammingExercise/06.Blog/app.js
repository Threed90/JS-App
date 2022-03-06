function attachEvents() {
    let loadButton = document.getElementById('btnLoadPosts');
    let postsElement = document.getElementById('posts');
    let viewButton = document.getElementById('btnViewPost');
    let titleElement = document.getElementById('post-title');
    let postBodyElement = document.getElementById('post-body');
    let postsUlElement = document.getElementById('post-comments');

    let posts = undefined;
    loadButton.addEventListener('click', async () => {
        posts = await fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(res => res.json())
            .then(data => data);

        for (const key in posts) {
            let optionElement = document.createElement('option');
            optionElement.setAttribute('value', key);
            optionElement.textContent = posts[key].title.toUpperCase();
            postsElement.appendChild(optionElement);
        }
    });


    viewButton.addEventListener('click', () => {
        if (posts) {
            let id = postsElement.value;
            titleElement.textContent = posts[id].title;
            postBodyElement.textContent = posts[id].body;

            fetch(`http://localhost:3030/jsonstore/blog/comments`)
            .then(res => res.json())
            .then(data => {
                let comments = Object.values(data).filter(e => e.postId == id);
                postsUlElement.textContent = null;
                for (const comment of comments) {
                    let liElement = document.createElement('li');
                    liElement.setAttribute('id', comment.id);
                    liElement.textContent = comment.text;

                    postsUlElement.appendChild(liElement);
                }
            })
        }
    })

}

attachEvents();