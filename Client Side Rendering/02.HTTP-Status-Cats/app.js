import { html, render } from '/node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

let rootElement = document.getElementById('allCats');

let catCardTemplate = (element) => html`
    <ul>
        ${element.map(x => html`
        <li>
            <img src="./images/${x.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${onClick} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id="${x.id}">
                    <h4>Status Code: ${x.statusCode}</h4>
                    <p>${x.statusMessage}</p>
                </div>
            </div>
        </li>`)}
    </ul>
`;

render(catCardTemplate(cats), rootElement);

function onClick(ev) {
    let parent = ev.target.parentElement;
    let toggleElement = parent.getElementsByClassName('status')[0];
    if (toggleElement.style.display === 'none') {
        toggleElement.style.display = 'block';
        ev.target.textContent = 'Hide status code';
    } else if (toggleElement.style.display = 'block') {
        toggleElement.style.display = 'none';
        ev.target.textContent = 'Show status code';
    }
}