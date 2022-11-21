import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
import { getItemTemp } from "../views/fragment/itemsFragment.js";

export async function catalogView(ctx) {
    const items = await getAllItems();
    ctx.render(catalogTemp(items));
}

function catalogTemp(data) {
    return html `
        <div class="row space-top">
            ${Object.values(data).map(i => getItemTemp(i))}
        </div>
    `;
}