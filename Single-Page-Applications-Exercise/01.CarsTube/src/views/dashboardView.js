import { html } from "../lib.js";
import { getAllItems } from "../api/data.js";

const dashboadrdTemp = (data) => html `
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${data.length > 0 ? data.map(cardItem) : html`<p class="no-cars">No cars in database.</p>`}
</section>`;

const cardItem = (item) =>  html `
    <div class="listing">
    <div class="preview">
        <img src=${item.imageUrl}>
    </div>
    <h2>${item.brand} ${item.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${item.year}</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${item._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function showDashboard(ctx) {
    const data = await getAllItems();
    ctx.render(dashboadrdTemp(data));
} 