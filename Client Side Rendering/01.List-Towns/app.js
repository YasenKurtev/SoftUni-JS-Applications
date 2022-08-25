import { html, render } from '/node_modules/lit-html/lit-html.js';

let rootElement = document.getElementById('root');
let loadBtn = document.getElementById('btnLoadTowns');


let listTemplate = (contacts) => html`
<ul>
    ${contacts.map(x => html`<li>${x}</li>`)}
</ul>
`;

loadBtn.addEventListener('click', ev => {
    ev.preventDefault();
    let inputElementValue = document.getElementById('towns').value;
    let contacts = inputElementValue.split(', ');
    render(listTemplate(contacts), rootElement);
})