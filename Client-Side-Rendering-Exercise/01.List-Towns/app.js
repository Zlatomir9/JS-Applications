import { html, render } from './node_modules/lit-html/lit-html.js';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

const root = document.getElementById('root');

function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const { towns } = Object.fromEntries(formData);
    const townsArr = towns.split(', ');
    renderTownsList(townsArr);
    form.reset();
}

function renderTownsList(data) {
    const result = createTownsList(data);
    render(result, root);
}

function createTownsList(data) {
    const ul = html`
        <ul>
            ${data.map(x => html `<li>${x}</li>`)}
        </ul>
    `;

    return ul;
}