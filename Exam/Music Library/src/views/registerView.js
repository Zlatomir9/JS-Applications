import { register } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerTemp = (handler) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${handler} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export async function showRegister(ctx) {
    ctx.render(registerTemp(createSubmitHandler(onRegister)));

    async function onRegister(data) {
        const email = data["email"];
        const password = data["password"];
        const rePass = data["re-password"];

        if(!email || !password || !rePass) {
            return alert("All fields are required!");
        }

        if(password !== rePass) {
            return alert ("Passwords do not match!");
        }
        
        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect("/dashboard");
    }
}