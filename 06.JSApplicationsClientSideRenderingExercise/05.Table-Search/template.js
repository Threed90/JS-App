import { getRecords } from './requests.js';
import { html } from './node_modules/lit-html/lit-html.js';

export async function getTemplate(searchValue) {
    
    let records = await getRecords();
    return html`
    ${records.map(r => html`
                                        <tr class=${
                                            isFounded(r.firstName, r.lastName, r.email, r.course, searchValue) && searchValue ?
                                            'select' :
                                            ''
                                        }>
                                            <td>${r.firstName} ${r.lastName}</td>
                                            <td>${r.email}</td>
                                            <td>${r.course}</td>
                                        </tr>`
    )}`;
}

function isFounded(firstName, lastName, email, course, searchValue){
    if(`${firstName} ${lastName}`.toLowerCase().includes(searchValue.toLowerCase()) ||
       email.toLowerCase().includes(searchValue.toLowerCase()) ||
       course.toLowerCase().includes(searchValue.toLowerCase()))
       {
           return true;
       } else {
           return false;
       }
}