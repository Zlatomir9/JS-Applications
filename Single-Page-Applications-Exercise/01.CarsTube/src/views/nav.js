import { logout } from '../api/user.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('header');

const navTemplate = (hasUser) => html`
<nav>
    <a class="active" href="/">Home</a>
    <a href="/dashboard">All Listings</a>
    <a href="/filter">By Year</a>
    ${!hasUser 
        ? html`<div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`
        : html `<div id="profile">
        <a>Welcome ${hasUser.username}</a>
        <a href="/myListings">My Listings</a>
        <a href="/create">Create Listing</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>` }
</nav>`;

export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), nav);
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}