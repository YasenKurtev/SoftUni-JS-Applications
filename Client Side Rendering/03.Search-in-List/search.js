import { html, render } from '/node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

function search() {

    let rootElement = document.getElementById('towns');
    let inputValue = document.getElementById('searchText');
    let searchBtn = document.getElementsByTagName('button')[0];
    let resultDiv = document.getElementById('result');

    let townsTemplate = (towns) => html`
    <ul>
        ${towns.map(x => html`<li>${x}</li>`)}
    </ul>
    `;

    let searchedTownsTemplate = (towns, value) => html`
    <ul>
        ${towns.map(x => x.includes(value)
            ? html`<li class="active">${x}</li>`
            : html`<li>${x}</li>`)}
    </ul>
    `;

    render(townsTemplate(towns), rootElement);

    searchBtn.addEventListener('click', ev => {
        render(searchedTownsTemplate(towns, inputValue.value), rootElement);
        resultDiv.textContent = `${document.getElementsByClassName('active').length} matches found`;
    })
}

search()