import { deleteItemById, getItemById } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (data, isOwner) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${data.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${data.brand}</li>
            <li><span>Model:</span>${data.model}</li>
            <li><span>Year:</span>${data.year}</li>
            <li><span>Price:</span>${data.price}$</li>
        </ul>
        <p class="description-para">${data.description}</p>
        ${isOwner
                ? html`
        <div class="listings-buttons">
            <a href="/edit/${data._id}" class="button-list">Edit</a>
            <a @click=${deleteItem} href="javascript:void(0)" class="button-list">Delete</a>
        </div>`
                : nothing}
    </div>
</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const data = await getItemById(ctx.params.id);
    const user = getUserData();
    const isOwner = user ? user._id === data._ownerId : false;

    ctx.render(detailsTemplate(data, isOwner));
}

async function deleteItem(e) {
    e.preventDefault();

    const confirmed = confirm('Are you sure you want to remove the selected item?');

    if(confirmed) {
        await deleteItemById(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }
}