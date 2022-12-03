import { register } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (handler) => html`
    <section id="register">
        <div class="container">
            <form @submit=${handler} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>
                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>
                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>`;

export async function showRegister(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister( { username, password, repeatPass } ) {
        if(password !== repeatPass) {
            return alert ("Passwords do not match!");
        }
        
        if(!username || !password || !repeatPass) {
            return alert("All fields are required!");
        }

        await register(username, password);
        ctx.updateNav();
        ctx.page.redirect("/dashboard");
    }
}