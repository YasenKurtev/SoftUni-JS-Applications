import { html, render } from '/node_modules/lit-html/lit-html.js';

let body = document.getElementsByTagName('body')[0];
let id;

let homeTemplate = () => html`
        <button id="loadBooks" @click=${onLoad}>LOAD ALL BOOKS</button>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <form>
        </form>
`;

let addBookTemplate = () => html`
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit" @click=${onSubmitAdd}>
`;

let editBookTemplate = () => html`
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Save" @click=${onSubmitEdit}>
`;

let addTableRowTemplate = (input) => html`
${input.map(x => html`
<tr id=${x[0]}>
    <td>${x[1].title}</td>
    <td>${x[1].author}</td>
    <td>
        <button @click=${onEdit}>Edit</button>
        <button @click=${onDelete}>Delete</button>
    </td>
</tr>
`)}
`;

render(homeTemplate(), body);
let form = document.getElementsByTagName('form')[0];
render(addBookTemplate(), form);

function onLoad(ev) {
    let tbody = document.getElementsByTagName('tbody')[0];
    fetch('http://localhost:3030/jsonstore/collections/books')
        .then(res => res.json())
        .then(data => {
            render(addTableRowTemplate(Object.entries(data)), tbody);
        })
        .catch(err => console.log(err));
}

function onEdit(ev) {
    ev.preventDefault();
    render(editBookTemplate(), form);
    let parent = ev.target.parentElement.parentElement;
    id = parent.id;
    let oldTitle = parent.getElementsByTagName('td')[0];
    let oldAuthor = parent.getElementsByTagName('td')[1];
    let titleInput = form.getElementsByTagName('input')[1];
    let authorInput = form.getElementsByTagName('input')[2];
    titleInput.value = oldTitle.textContent;
    authorInput.value = oldAuthor.textContent;
}

function onDelete(ev) {
    ev.preventDefault();
    let parent = ev.target.parentElement.parentElement;
    id = parent.id;

    fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            onLoad();
        })
        .catch(err => console.log(err))
}

function onSubmitAdd(ev) {
    ev.preventDefault();
    let formData = new FormData(form);
    let title = formData.get('title');
    let author = formData.get('author');

    if (title !== '' && author !== '') {
        fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'POST',
            body: JSON.stringify({ author: author, title: title })
        })
            .then(res => res.json())
            .then(data => {
                onLoad();
                form.reset();
            })
            .catch(err => console.log(err));
    }

}

function onSubmitEdit(ev) {
    ev.preventDefault();
    let formData = new FormData(form);
    let title = formData.get('title');
    let author = formData.get('author');

    fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ author: author, title: title })
    })
        .then(res => res.json())
        .then(data => {
            onLoad();
            form.reset();
            render(addBookTemplate(), form);
        })
        .catch(err => console.log(err));
}