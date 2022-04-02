import { html } from '../node_modules/lit-html/lit-html.js';
import { userInfo } from '../util/userInfo.js';

export function getNavTemplate() {
    return html`
            <a href="/" class="site-logo">Team Manager</a>
            <nav>
                <a href="/teams" class="action">Browse Teams</a>
                <a href="/login" class="action" style=${userInfo.getUserObj() ? 'display: none' : 'display: inline-block'}>Login</a>
                <a href="/register" class="action" style=${userInfo.getUserObj() ? 'display: none' : 'display: inline-block'}>Register</a>
                <a href="/myteams" class="action" style=${userInfo.getUserObj() ? 'display: inline-block' : 'display: none'}>My Teams</a>
                <a href="/logout" class="action" style=${userInfo.getUserObj() ? 'display: inline-block' : 'display: none'}>Logout</a>
            </nav>`;
}