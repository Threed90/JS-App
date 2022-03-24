import { render } from '../node_modules/lit-html/lit-html.js'
import { view } from '../views/views.js'
import { request } from '../api/requests.js';
import page from '../node_modules/page/page.mjs';
import {userInfo} from '../util/userInfo.js';

function homeView(ctx) {
    render(view.getHomeView(), document.body);
}

async function dashboardView(ctx) {

    let furnitures = await request.furnitures.getAll();
    render(view.getDashboardView(furnitures), document.body);
}

async function detailsView(ctx) {
    debugger;
    let furniture = await request.furnitures.getById(ctx.params.id);

    render(view.getDetailsView(furniture), document.body);
}

function loginView(ctx) {
    render(view.getLoginView(), document.body);
}

function registerView(ctx) {
    render(view.getRegisterView(), document.body);
}

function logoutView(ctx) {

    request.user.logout()
        .then(res => {
            if (res.status == 204) {
                sessionStorage.clear();
                page.redirect('/login');
            }
        });
}

function createView(ctx) {
    render(view.getCreateView(), document.body);
}

function deleteView(ctx){
    
    request.furnitures.deleteById(ctx.params.id)
    .then(res => {
        if(!res.ok){
            throw new Error('Unable to delete!');
        }

        alert('Successfully deleted!')
        page.redirect(`/catalog`)
    })
    .catch(err => alert(err.message));
}

async function editView(ctx){
    let furniture = await request.furnitures.getById(ctx.params.id);

    render(view.getEditView(furniture), document.body);
}

async function myFurnitureView(ctx){
    let furnitures = await request.furnitures.getByUserId(userInfo.getUserObj()._id);

    render(view.getMyFurnitureView(furnitures), document.body);
}

export const viewHandler = {
    homeView,
    dashboardView,
    detailsView,
    loginView,
    registerView,
    logoutView,
    createView,
    deleteView,
    editView,
    myFurnitureView
}
