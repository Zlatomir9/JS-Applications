import { page, render } from "./lib.js";
import { updateNav } from "./views/navView.js";
import { getUserData } from "./util.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginView.js";
import { showRegister } from "./views/registerView.js";
import { showDashboard } from "./views/dashboardView.js";
import { showAdd } from "./views/addView.js";
import { showDetails } from "./views/detailsView.js";
import { showEdit } from "./views/editView.js";

const main = document.querySelector('main');

page(decorateContext);
page("/", showHome);
page("/index.html", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/dashboard", showDashboard);
page("/add", showAdd);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);

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