import { html, render } from './node_modules/lit-html/lit-html.js';
import { requests } from './requests.js';

function getMainTemplate(){
    return html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>

    <form id="edit-form" style="display: none">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>`;
}

async function getBooksTemplate() {

    let books = await requests.getAllBooks();
    return html`
            ${books.map(b => html`<tr book-id=${b[0]}>
                                      <td>${b[1].title}</td>
                                      <td>${b[1].author}</td>
                                      <td>
                                          <button @click=${() => {editBook(b[0], b[1].title, b[1].author)}}>Edit</button>
                                          <button @click=${deleteBook}>Delete</button>
                                      </td>
                                  </tr>`)}`;
}

async function deleteBook(evt) {
    debugger;
    
    let id = evt.target.parentNode.parentNode.getAttribute('book-id');
    await requests.deleteABook(id);
    let template = await getBooksTemplate();
    render(template, document.querySelector('tbody'));
}

function editBook(id, title, author) {
    
    let addForm = document.getElementById('add-form');
    let editForm = document.getElementById('edit-form');

    let inputs = editForm.querySelectorAll('input');
    inputs[0].value = id;
    inputs[1].value = title;
    inputs[2].value = author;
    
    addForm.style.display = 'none';
    editForm.style.display = 'block';
}

export const templates = {
    getMainTemplate,
    getBooksTemplate
}