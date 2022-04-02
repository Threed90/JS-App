import page from '../node_modules/page/page.mjs';
import {viewHandler} from './viewHandler.js';

function start(){
    page('/', viewHandler.homeView);
    page('/catalog', viewHandler.catalogView);
    page('/login', viewHandler.loginView);
    page('/register', viewHandler.registerView);
    page('/create', viewHandler.createView);
    page('/logout', viewHandler.logoutView);
    page('/delete/:id', viewHandler.deleteView);
    page('/details/:id', viewHandler.detailsView);

    page.start();
}

export const engine = {
    start
}