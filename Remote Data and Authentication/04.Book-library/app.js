function solve() {
    let loadBtn = document.getElementById(`loadBooks`);
    let url = `http://localhost:3030/jsonstore/collections/books`;
    let tBody = document.querySelector(`tbody`);
    let form = document.querySelector(`form`);
    let formInputElements = document.querySelectorAll(`form input`);
    //LOAD BUTTON EVENT
    loadBtn.addEventListener(`click`, loadBooks);
    function loadBooks(e) {
        tBody.replaceChildren();
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                let bookInfo = Object.entries(data);
                bookInfo.forEach((book) => {
                    let bookId = book[0];
                    console.log(bookId);
                    let bookAuthor = book[1].author;
                    let bookTitle = book[1].title;
                    let tr = document.createElement(`tr`);
                    tr.id = bookId;

                    let tdAuthor = document.createElement(`td`);
                    tdAuthor.textContent = bookAuthor;
                    let tdTitle = document.createElement(`td`);
                    tdTitle.textContent = bookTitle;

                    let editBtn = document.createElement(`button`);
                    editBtn.textContent = `Edit`;
                    editBtn.addEventListener(`click`, editFunc);
                    let deleteBtn = document.createElement(`button`);
                    deleteBtn.textContent = `Delete`;
                    deleteBtn.addEventListener(`click`, deleteFunc);
                    function deleteFunc(ev) {
                        let id = ev.target.parentElement.parentElement.id;
                        console.log(id);
                        fetch(`${url}/${id}`, {
                            method: 'DELETE'
                        }).
                            then(res => res.json())
                            .then(data => {
                                loadBooks()
                            })

                    }
                    let tdButtons = document.createElement(`td`);
                    tdButtons.appendChild(editBtn);
                    tdButtons.appendChild(deleteBtn);
                    tr.appendChild(tdTitle);
                    tr.appendChild(tdAuthor);
                    tr.appendChild(tdButtons);
                    tBody.appendChild(tr);
                });
            });
    }

    //ADD EVENT TO FORM
    form.addEventListener("submit", submitBook);
    function submitBook(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let title = formData.get(`title`);
        let author = formData.get(`author`);
        let bookObject = {
            author,
            title,
        };
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(bookObject),
        })
            .then((resp) => resp.json())
            .catch((err) => console.error(err));
        formInputElements.forEach((el) => (el.value = ``));
    }
    function editFunc(bookId) {

    }

}
solve();