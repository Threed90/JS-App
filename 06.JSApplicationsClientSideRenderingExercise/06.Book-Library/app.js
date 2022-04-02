import { render } from './node_modules/lit-html/lit-html.js';
import { templates } from './templates.js';
import { requests } from './requests.js';

render(templates.getMainTemplate(), document.querySelector('body'));

document.getElementById('loadBooks').addEventListener('click', async (e) => {
    render(await templates.getBooksTemplate(), document.querySelector('tbody'));
});

document.getElementById('add-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let title = formData.get('title');
    let author = formData.get('author');

    if (title && author) {
        requests.createABook(title, author);
        e.currentTarget.reset();
        render(await templates.getBooksTemplate(), document.querySelector('tbody'));
    }
});

document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
debugger;
    let formData = new FormData(e.currentTarget);

    let id = formData.get('id');
    let title = formData.get('title');
    let author = formData.get('author');

    if(title && author && id){
        requests.updateABook(id, title, author);
        e.currentTarget.reset();
        e.currentTarget.style.display = 'none';
        document.getElementById('add-form').style.display = 'block';
        render(await templates.getBooksTemplate(), document.querySelector('tbody'));
    }
})