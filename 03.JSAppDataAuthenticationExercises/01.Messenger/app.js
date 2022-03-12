function attachEvents() {
    let messagesElement = document.getElementById('messages');

    let divFormElement = document.getElementById('controls');

    divFormElement.addEventListener('click', (e) => {
        let url = 'http://localhost:3030/jsonstore/messenger';

        let authorElement = e.currentTarget.querySelector('input[name="author"]');
        let contentElement = e.currentTarget.querySelector('input[name="content"]');

        if (e.target.id == 'submit' && authorElement.value && contentElement.value) {
            fetch(url, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    author: authorElement.value,
                    content: contentElement.value
                })
            });
            authorElement.value = '';
            contentElement.value = '';
        } else if (e.target.id == 'refresh') {

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    let result = '';
                    for (const comment of Object.values(data)) {
                        result += `${comment.author}: ${comment.content}\n`;
                    }
                    messagesElement.textContent = result;
                });
            authorElement.value = '';
            contentElement.value = '';
        }

    });
}

attachEvents();