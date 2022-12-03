import { page, render } from "./lib.js";
import { updateNav } from "./views/nav.js";
import { getUserData } from "./util.js";
import { showLogin } from "./views/loginView.js";
import { showRegister } from "./views/registerView.js";
import { showHome } from "./views/homeView.js";
import { showDashboard } from "./views/dashboardView.js";
import { showCreate } from "./views/createView.js";
import { showDetails } from "./views/detailsView.js";
import { showEdit } from "./views/editView.js";
import { showUserItems } from "./views/userItemsView.js";
import { showFilter } from "./views/filterView.js";

const main = document.getElementById('site-content');

page(decorateContext);
page("/", showHome);
page("/index.html", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/dashboard", showDashboard);
page("/create", showCreate);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);
page("/myListings", showUserItems);
page("/filter", showFilter);

page.start();
updateNav();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if(user) {
        ctx.user = user;
    }

    next();
}

function renderMain(content) {
    render(content, main);
}