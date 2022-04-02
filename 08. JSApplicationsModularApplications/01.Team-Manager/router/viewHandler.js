import { render } from '../node_modules/lit-html/lit-html.js'
import { templates } from '../templates/templates.js'
import { requests } from '../api/requests.js'
import page from '../node_modules/page/page.mjs';
import {userInfo} from '../util/userInfo.js'

let mainElement = document.querySelector('#content main');
let headerElement = document.querySelector('#content header');

function homeView(ctx) {
    render(templates.getHomeTemplate(), mainElement);
}

async function teamsView(ctx) {
    let teams = await requests.items.getAll();
    let members = await requests.members.getAll();
    render(templates.getTeamsTemplate(teams, members), mainElement);
}

function navView(ctx, next) {
    debugger;
    render(templates.getNavTemplate(), headerElement);
    next();
}

function loginView(ctx) {
    render(templates.getLoginTemplate(), mainElement);
}

function registerView(ctx) {
    render(templates.getRegisterTemplate(), mainElement);
}

function createView(ctx) {
    render(templates.getCreateView(), mainElement);
}

async function editView(ctx){
    let team = await requests.items.getById(ctx.params.id);

    render(templates.getEditTemplate(team), mainElement)
}

async function detailsView(ctx) {
    debugger;
    let item = await requests.items.getById(ctx.params.id);
    let allMembers = await fetch(`http://localhost:3030/data/members?where%3DteamId%3D%22${ctx.params.id}%22&load=user%3D_ownerId%3Ausers`)
                            .then(res => res.json())
                            .then(data => data);
    
    let members = allMembers.filter(m => m.status == 'member' && m.teamId == item._id);
    let pending = allMembers.filter(m => m.status == 'pending' && m.teamId == item._id);
    render(templates.getDetailsView(item, members, pending), mainElement);
}

// function deleteView(ctx){
//     requests.items.deleteById(ctx.params.id)
//     .then(res => {
//         if(res.ok){
//             page.redirect('/catalog');
//         }
//     })
// }
async function myTeamsView(){
    debugger;
    let user = userInfo.getUserObj();

    let teams = await fetch(`http://localhost:3030/data/members?where=_ownerId%3D%22${user._id}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)
                        .then(res => res.json())
                        .then(data => data);
                        
    let members = await requests.members.getAll();

    render(templates.getMyTeamTemplate(teams, members), mainElement);
}

function logoutView(ctx){
    debugger;
    requests.user.logout()
    .then(res => {
        if(res.status == 204){
            sessionStorage.removeItem('team-user');
            page.redirect('/');
        }
    });
}

async function deniedMembership(ctx){
    let id = ctx.params.id;
    let memberships = await requests.members.getAll();

    let member = memberships.find(m => m._id == id);
    fetch(`http://localhost:3030/data/members/${id}`, {
        method : 'DELETE',
        headers : {
            'content-type' : 'application/json',
            'X-Authorization' : userInfo.getToken()
        }
    })
    .then(res => {
        if(res.ok){
            ctx.page.redirect(`/details/${member.teamId}`) //maybe
        }
    })
}

async function joinTeam(ctx){
    let id = ctx.params.id;

    fetch('http://localhost:3030/data/members', {
        method : 'POST',
        headers : {
            'content-type' : 'application/json',
            'X-Authorization' : userInfo.getToken()
        },
        body : JSON.stringify({
            teamId : id
        })
    })
    .then(res => {
        if(res.ok){
            ctx.page.redirect(`/details/${id}`);
        }
    })
}

async function approveMember(ctx){

    let id = ctx.params.id;
    let memberships = await requests.members.getAll();

    let member = memberships.find(m => m._id == id);
    fetch('http://localhost:3030/data/members' + `/${id}`, {
        method : 'PUT',
        headers : {
            'content-type' : 'application/json',
            'X-Authorization' : userInfo.getToken()
        },
        body : JSON.stringify({
            status : 'member'
        })
    })
    .then(res => {
        if(res.ok){
            ctx.page.redirect(`/details/${member.teamId}`);
        }
    })
}

export const viewHandler = {
    navView,
    homeView,
    teamsView,
    loginView,
    registerView,
    logoutView,
    detailsView,
    createView,
    myTeamsView,
    editView,
    deniedMembership,
    joinTeam,
    approveMember
}