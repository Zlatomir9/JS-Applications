import { html, render, page } from "../lib.js";
import { logout } from '../api/user.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('header');

const navTemp = (hasUser) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
<nav>
    <div>
        <a href="/dashboard">Dashboard</a>
    </div>
    ${!hasUser 
        ? html`<div class="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>`
        : html `<div class="user">
                    <a href="/add">Add Album</a>
                    <a @click=${onLogout} href="javascript:void(0)">Logout</a>
                </div>` }
    </nav>`;

export function updateNav() {
    const user = getUserData();
    render(navTemp(user), nav);
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/dashboard');
}