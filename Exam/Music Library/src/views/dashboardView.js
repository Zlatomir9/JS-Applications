import { html } from "../lib.js";
import { getAllAlbums } from "../api/data.js";

const dashboardTemp = (data) => html`
<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
        ${data.length > 0 ? data.map(albumItem) : html`<h2>There are no albums added yet.</h2>`}
    </ul>
</section>`;

const albumItem = (item) => html`
        <li class="card">
            <img src=${item.imageUrl} alt="travis" />
            <p>
                <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
            </p>
            <p>
                <strong>Album name: </strong><span class="album">${item.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
        </li>`;

export async function showDashboard(ctx) {
    const data = await getAllAlbums();
    ctx.render(dashboardTemp(data));
}