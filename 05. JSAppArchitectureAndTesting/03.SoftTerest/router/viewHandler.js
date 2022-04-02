import { render } from '../node_modules/lit-html/lit-html.js'
import { view } from '../views/views.js'
import { requests } from '../api/requests.js'
import page from '../node_modules/page/page.mjs';

function homeView(ctx) {
    render(view.getHomeView(), document.body);
}

async function catalogView(ctx) {
    let items = await requests.items.getAll();

    render(view.getCatalogView(items), document.body);
}

function loginView(ctx) {
    render(view.getLoginView(), document.body);
}

function registerView(ctx) {
    render(view.getRegisterView(), document.body);
}

function createView(ctx) {
    render(view.getCreateView(), document.body);
}

async function detailsView(ctx) {
    debugger;
    let item = await requests.items.getById(ctx.params.id);

    render(view.getDetailView(item), document.body);
}

function deleteView(ctx){
    requests.items.deleteById(ctx.params.id)
    .then(res => {
        if(res.ok){
            page.redirect('/catalog');
        }
    })
}

function logoutView(ctx){
    debugger;
    requests.user.logout()
    .then(res => {
        if(res.status == 204){
            sessionStorage.removeItem('softterest-user');
            page.redirect('/login');
        }
    });
}

export const viewHandler = {
    homeView,
    catalogView,
    loginView,
    registerView,
    createView,
    detailsView,
    deleteView,
    logoutView
}