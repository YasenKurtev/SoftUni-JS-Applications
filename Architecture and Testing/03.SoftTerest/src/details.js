import { router, viewsSelectors } from "./router.js";

export function details(id) {
    let detailsView = viewsSelectors.details;
    detailsView.style.display = 'block';
    let userId = localStorage.getItem('id');

    fetch(`http://localhost:3030/data/ideas/${id}`)
        .then(res => res.json())
        .then(data => {
            detailsView.innerHTML = `
            <img class="det-img" src="${data.img}" />
            <div class="desc">
            <h2 class="display-5">${data.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${data.description}</p>
            </div>
            <div class="text-center">
            <a id="${data._id}" class="btn detb" href="/delete">Delete</a>
            </div>`
            let deleteBtn = detailsView.getElementsByTagName('a')[0];
            deleteBtn.addEventListener('click', onDelete);
            if (userId !== data._ownerId) {
                deleteBtn.style.display = 'none';
            }
        })
}

function onDelete(ev) {
    ev.preventDefault();
    let id = ev.target.id;
    let url = new URL(ev.target.href);
    router(url.pathname)(id);
}