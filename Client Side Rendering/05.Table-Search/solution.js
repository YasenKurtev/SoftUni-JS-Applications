import { html, render } from '/node_modules/lit-html/lit-html.js';

function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);
    let rootElement = document.getElementsByTagName('tbody')[0];

    fetch('http://localhost:3030/jsonstore/advanced/table')
        .then(res => res.json())
        .then(data => {
            render(tableRowTemplate(Object.values(data)), rootElement);
        })

    function onClick() {
        let input = document.getElementById('searchField');
        let allTds = Array.from(rootElement.getElementsByTagName('td'));
        Array.from(document.getElementsByClassName('select')).map(x => x.classList.remove('select'));
        for (let element of allTds) {
            if (element.textContent.toLowerCase().includes(input.value.toLowerCase())) {
                element.parentElement.classList.add('select');
            }
        }
        input.value = '';
    }

    let tableRowTemplate = (input) => html`
    ${input.map(x => html`
    <tr>
        <td>${x.firstName} ${x.lastName}</td>
        <td>${x.email}</td>
        <td>${x.course}</td>
    </tr>
    `)}
    `;
}

solve()