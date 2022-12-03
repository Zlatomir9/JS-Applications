import { createItem } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemp = (handler) => html `
    <section id="create-listing">
    <div class="container">
        <form @submit=${handler} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>
            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">
            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">
            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">
            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">
            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">
            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">
            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

export async function showCreate(ctx) {
    ctx.render(createTemp(createSubmitHandler(onCreate)));

    async function onCreate(data) {
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

        await createItem({ brand, model, description, year, imageUrl, price });
        ctx.page.redirect('/dashboard');
    }
}