import { router, viewsSelectors } from "./router.js";
import { getToken } from "./auth.js";

let formElement = document.getElementsByTagName('form')[2];
formElement.addEventListener('submit', onSubmit);

export function create() {
    let createView = viewsSelectors.create;
    createView.style.display = 'block';
}

function onSubmit(ev) {
    ev.preventDefault();
    let dashboardView = viewsSelectors.dashboard;
    let formData = new FormData(formElement);
    let title = formData.get('title');
    let description = formData.get('description');
    let imageURL = formData.get('imageURL');

    if (title.length >= 6 && description.length >= 10 && imageURL.length >= 5) {
        fetch('http://localhost:3030/data/ideas', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify({ title: title, description: description, img: imageURL })
        })
            .then(res => res.json())
            .then(data => {
                dashboardView.insertAdjacentHTML('afterbegin', `
                <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
                <div class="card-body">
                <p class="card-text">${data.title}</p>
                <p style="display: none;">${data.description}</p>
                </div>
                <img class="card-image" src="${data.imageURL}" alt="Card image cap">
                <a class="btn" id="${data._ownerId}" href="/details">Details</a>
                </div>`);
                formElement.reset();
                router('/dashboard')();
            })
    }
}