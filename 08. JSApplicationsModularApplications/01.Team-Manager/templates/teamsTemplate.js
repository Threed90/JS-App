import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { userInfo } from '../util/userInfo.js';
import { requests } from '../api/requests.js';

export function getTeamsTemplate(teams, members) {
    return html`
    <section id="browse">
    
        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>
        ${userInfo.getUserObj() 
                            ? html`<article class="layout narrow">
                                        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
                                    </article>` 
                            : nothing
                        }
        
        ${teams.map(team => 
        html`
            <article class="layout">
                <img src=${team.logoUrl.substring(0, 1) == '/' ? `..${team.logoUrl}` : team.logoUrl} class="team-logo left-col">
                <div class="tm-preview">
                    <h2>${team.name}</h2>
                    <p>${team.description}</p>
                    <span class="details">${members.filter(m => m.teamId == team._id).length} Members</span>
                    <div><a href="/details/${team._id}" class="action">See details</a></div>
                </div>
            </article>`)
        }
            
    </section>`
}