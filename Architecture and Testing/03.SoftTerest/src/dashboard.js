import { router, viewsSelectors } from "./router.js";
import { getToken } from "./auth.js";

export function dashboard() {
    let dashboardView = viewsSelectors.dashboard;
    let noIdeasMessage = dashboardView.getElementsByTagName('h1')[0];

    fetch('http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc', {
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            dashboardView.innerHTML = '';
            for (let element of data) {
                dashboardView.insertAdjacentHTML('beforeend', `
                <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
                <div class="card-body">
                <p class="card-text">${element.title}</p>
                </div>
                <img class="card-image" src="${element.img}" alt="Card image cap">
                <a class="btn" id="${element._id}" href="#">Details</a>
                </div>`);
            }
            dashboardView.appendChild(noIdeasMessage);
            dashboardView.style.display = 'flex';
            if (dashboardView.children.length === 1) {
                noIdeasMessage.style.display = 'block';
            } else {
                noIdeasMessage.style.display = 'none';
            }
            let ideasList = Array.from(dashboardView.children);
            ideasList.pop();
            for (let element of ideasList) {
                let detailsBtn = element.getElementsByTagName('a')[0];
                detailsBtn.addEventListener('click', onDetails);
            }
        })
        .catch(err => console.log(err));


}

function onDetails(ev) {
    ev.preventDefault();
    let id = ev.target.id;
    router('/details')(id);
}