import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { userInfo } from '../util/userInfo.js';

/**
 * 
 * @param {*} team the current team
 * @param {*} members users with membership (status=member)
 * @param {*} pending pending membership (status=pending)
 * @param {*} usernames names of members of the team 
 */

//data/members?where%3DteamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers --> for usernames
export function getDetailsView(team, members, pending) {
    return html`
    <section id="team-home">
        <article class="layout">
            <img src=${team.logoUrl.substring(0, 1)=='/' ? `..${team.logoUrl}` : team.logoUrl} class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${members.length} Members</span>
                ${getTeamButton(team, members, pending)}
            </div>
            <div class="pad-large">
                <h3>Members</h3>
                <ul class="tm-members">
                    <li>${members.filter(m => m.user._id == userInfo.getUserObj()._id).map(m => m.user.username)[0]}</li>
                    ${members.map(m => getMembershipButton(m, team))}
    
                </ul>
            </div>
            <div class="pad-large" style=${userInfo.getUserObj() && userInfo.getUserObj()._id == team._ownerId
                                        ? 'display: block'
                                        : 'display: none'}>
                <h3>Membership Requests</h3>
                <ul class="tm-members">
                    ${pending.map(m => getPendingButton(m, team))}
                </ul>
    
    
            </div>
        </article>
    </section>`
}

function getPendingButton(member, team) {
    let user = userInfo.getUserObj();

    if (user && user._id == team._ownerId) {
        return html`<li>${member.user.username}<a href="/approve/${member._id}" class="tm-control action">Approve</a><a href="/decline/${member._id}" class="tm-control action">Decline</a></li>`;
    } else {
        return html`<li>${member.user.username}</li>`;
    }
}

function getMembershipButton(member, team){
    let user = userInfo.getUserObj();
    let id = member.user._id;
    if(team._ownerId == user._id && id == user._id){
        return nothing;
    }
    if (user && user._id == team._ownerId) {
        return html`<li>${member.user.username}<a href="/remove/${member._id}" class="tm-control action">Remove from team</a></li>`;
    } else {
        return html`<li>${member.user.username}</li>`;
    }
}

function getTeamButton(team, members, pending) {

    let user = userInfo.getUserObj();

    if (user) {
        if (user._id == team._ownerId) {
            return html`<a href="/edit/${team._id}" class="action">Edit team</a>`;
        } else {
            let membership = members.find(m => m._ownerId == user._id);
            let pendingReq = pending.find(m => m._ownerId == user._id)
            if (membership) {
                return html`<a href="/leave/${membership._id}" class="action invert">Leave team</a>`;
            } else if (pendingReq) {
                return html`Membership pending. <a href="/cancel/${pendingReq._id}">Cancel request</a>`;
            } else {
                return html`<a href="/join/${team._id}" class="action">Join team</a>`
            }
        }
    } else {
        return nothing;
    }

}