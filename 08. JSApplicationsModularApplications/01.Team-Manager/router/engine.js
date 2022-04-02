import page from '../node_modules/page/page.mjs';
import {viewHandler} from './viewHandler.js';

function start(){

    page(viewHandler.navView);

    page('/', viewHandler.homeView);
    page('/teams', viewHandler.teamsView);
    page('/login', viewHandler.loginView);
    page('/register', viewHandler.registerView);
    page('/logout', viewHandler.logoutView);
    page('/details/:id', viewHandler.detailsView);
    page('/create', viewHandler.createView);
    page('/myteams', viewHandler.myTeamsView);
    page('/edit/:id', viewHandler.editView);
    page('/remove/:id', viewHandler.deniedMembership);
    page('/decline/:id', viewHandler.deniedMembership);
    page('/leave/:id', viewHandler.deniedMembership);
    page('/cancel/:id', viewHandler.deniedMembership);
    page('/join/:id', viewHandler.joinTeam);
    page('/approve/:id', viewHandler.approveMember);

    page.start();
}

export const engine = {
    start
}