import { getItemById, editItem } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemp = (album, handler) => html`
<section id="edit-listing">
    <div class="container">
        <form @submit=${handler} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>
            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${album.brand}>
            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${album.model}>
            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${album.description}>
            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${album.year}>
            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${album.imageUrl}>
            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${album.price}>
            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const album = await getItemById(id);

    ctx.render(editTemp(album, createSubmitHandler(onEdit)));

    async function onEdit(data){
        let {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
          } = data;
        
        year = Number(year);
        price = Number(price);

        if (!brand || !model || !description || !year || !imageUrl || !price) {
            return alert('All fields are required!');
        }

        if (year < 0 || price < 0) {
            return alert('Year and price must be positive numbers!');
        }

        await editItem( { brand, model, description, year, imageUrl, price }, id);
        ctx.page.redirect(`/details/${id}`);
    }
} 