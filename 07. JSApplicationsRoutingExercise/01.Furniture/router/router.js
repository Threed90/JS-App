import page from '../node_modules/page/page.mjs';
import {viewHandler} from './viewHandler.js';

function start(){
    page('/', viewHandler.homeView);
    page('/catalog', viewHandler.dashboardView);
    page('/details/:id', viewHandler.detailsView);
    page('/login', viewHandler.loginView);
    page('/register', viewHandler.registerView);
    page('/logout', viewHandler.logoutView);
    page('/create', viewHandler.createView);
    page('/delete/:id', viewHandler.deleteView);
    page('/edit/:id', viewHandler.editView);
    page('/myfurnitures', viewHandler.myFurnitureView); // todo

    page.start();
}

export const router ={
    start
};