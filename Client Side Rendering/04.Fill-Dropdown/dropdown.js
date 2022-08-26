import { html, render } from '/node_modules/lit-html/lit-html.js';

function addItem() {

    let dropdownMenu = document.getElementById('menu');
    let input = document.getElementsByTagName('input')[0];
    let addBtn = document.getElementsByTagName('input')[1];

    fetchData();

    addBtn.addEventListener('click', ev => {
        ev.preventDefault();
        fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'POST',
            body: JSON.stringify({ text: input.value })
        })
            .then(res => res.json())
            .then(data => {
                fetchData()
                input.value = '';
            })
            .catch(err => console.log(err))
    })

    let dropdownTemplate = (input) => html`
    ${input.map(x => html`<option value=${x._id}>${x.text}</option>`)}
    `;

    function fetchData() {
        fetch('http://localhost:3030/jsonstore/advanced/dropdown')
            .then(res => res.json())
            .then(data => {
                render(dropdownTemplate(Object.values(data)), dropdownMenu);
            })
    }
}

addItem()