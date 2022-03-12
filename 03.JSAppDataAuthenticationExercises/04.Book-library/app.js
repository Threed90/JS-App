const tbody = document.querySelector('table tbody');
const loadBtn = document.getElementById('loadBooks');

const formElement = document.querySelector('form');
let h3 = formElement.querySelector('h3');
let formButton = formElement.querySelector('button');
let editBookId = '';
let titleElement;
let authorElement;
function renderData() {
    loadBooks();
    createNewBook();

    tbody.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {
            let row = e.target.parentNode.parentNode;
            let id = row.getAttribute('bookId');

            titleElement = row.querySelector('td:nth-of-type(1)');
            authorElement = row.querySelector('td:nth-of-type(2)');
            let titleInput = document.querySelector('input[name="title"]');
            let authorInput = document.querySelector('input[name="author"]');

            if (e.target.textContent == 'Edit') {

                h3.textContent = 'Edit FORM';
                formButton.textContent = 'Save';
                editBookId = row.getAttribute('bookId');
                titleInput.value = titleElement.textContent;
                authorInput.value = authorElement.textContent;

            } else if (e.target.textContent == 'Delete') {

                row.remove();
                fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
                    method: 'DELETE'
                });
            }
        }
    })
}

function loadBooks() {
    tbody.textContent = null;
    loadBtn.addEventListener('click', (e) => {
        fetch('http://localhost:3030/jsonstore/collections/books')
            .then(res => res.json())
            .then(data => {
                tbody.textContent = null;
                for (const key in data) {
                    let tr = createBookElement(data[key], key);
                    tbody.appendChild(tr);
                }
            });
    })
}

function createNewBook() {

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let book = {
            author: formData.get('author'),
            title: formData.get('title')
        };

        if (h3.textContent == 'Edit FORM' && formButton.textContent == 'Save') {

            book.author = book.author ? book.author : authorElement.textContent;
            book.title = book.title ? book.title : titleElement.textContent;

            fetch(`http://localhost:3030/jsonstore/collections/books/${editBookId}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(book)
            })
                .then(res => {
                    if (res.ok) {
                        document.querySelector(`tr[bookId="${editBookId}"]`).replaceWith(createBookElement(book, editBookId));
                        formElement.reset();
                        h3.textContent = 'FORM';
                        formButton.textContent = 'Submit';
                    }
                })
        } else if (h3.textContent == 'FORM' && formButton.textContent == 'Submit' && book.author && book.title) {
            fetch(`http://localhost:3030/jsonstore/collections/books/${editBookId}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(book)
            })
                .then(res => res.json())
                .then(data => {
                    let tr = createBookElement(book, data._id);
                    tbody.appendChild(tr);
                    formElement.reset();
                });
        }


    })

}

function createBookElement(book, id) {
    let tr = document.createElement('tr');
    tr.setAttribute('bookId', id);
    let titleTd = document.createElement('td');
    titleTd.textContent = book.title;
    tr.appendChild(titleTd);

    let authorTd = document.createElement('td');
    authorTd.textContent = book.author;
    tr.appendChild(authorTd);

    let btnTd = document.createElement('td');

    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    btnTd.appendChild(editBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    btnTd.appendChild(deleteBtn);

    tr.appendChild(btnTd);

    return tr;
}

renderData();