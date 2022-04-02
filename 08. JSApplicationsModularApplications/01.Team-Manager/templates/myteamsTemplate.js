import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { userInfo } from '../util/userInfo.js';

export function getMyTeamTemplate(teams, members) {
    return html`
    <section id="my-teams">
    
        <article class="pad-med">
            <h1>My Teams</h1>
        </article>
    
        <article class="layout narrow" style="${userInfo.getUserObj() && teams && teams.length == 0 ? 'display: block' : 'display: none'}">
            <div class="pad-med">
                <p>You are not a member of any team yet.</p>
                <p><a href="/teams">Browse all teams</a> to join one, or use the button bellow to cerate your own
                    team.</p>
            </div>
            <div class=""><a href="/create" class="action cta">Create Team</a></div>
        </article>
        ${teams.map(t => 
        html`
            <article class="layout">
                <img src=${t.team.logoUrl && t.team.logoUrl.substring(0, 1) == '/' ? `..${t.team.logoUrl}` : t.team.logoUrl} class="team-logo left-col">
                <div class="tm-preview">
                    <h2>${t.team.name}</h2>
                    <p>${t.team.description}</p>
                    <span class="details">${members.filter(m => m.teamId == t.team._id && m.status == 'member').length} Members</span>
                    <div><a href="/details/${t.team._id}" class="action">See details</a></div>
                </div>
            </article>`)
        }
    
    </section>`
}