import { requests } from './requests.js';
import { createCustomElement, getDateTimeNow } from './utilities.js';


let topicContainerPreviews = document.querySelector('.topic-title .topic-container');
let topicAndComentsContainer = document.querySelector('#topic-view .topic-container');

async function showTopicPreviews() {

    let topics = await requests.getAllTopics();
    topicContainerPreviews.textContent = null;


    for (const key in topics) {

        let element = createCustomElement('div', { class: 'topic-name-wrapper' },
            createCustomElement('div', { class: 'topic-name' },
                createCustomElement('a', { href: `/${key}`, class: 'normal' },
                    createCustomElement('h2', { textContent: `${topics[key].name}` })),
                createCustomElement('div', { class: 'columns' },
                    createCustomElement('div', null,
                        createCustomElement('p', { textContent: 'Date: ' },
                            createCustomElement('time', { textContent: topics[key].createdOn })),
                        createCustomElement('div', { class: 'nick-name' },
                            createCustomElement('p', { textContent: 'Username: ' },
                                createCustomElement('span', { textContent: topics[key].username })))))));

        topicContainerPreviews.appendChild(element);
    }
    // topicContainerPreviews.appendChild(fragment);
}



async function showTopic(id) {

    let topic = await requests.getTopic(id);

    let fragment = document.createDocumentFragment();

    let titleElement = createCustomElement('div', { class: 'topic-name' },
        createCustomElement('a', { href: '/', class: 'normal' },
            createCustomElement('h2', { textContent: `${topic.name}` })));

    fragment.appendChild(titleElement);

    let topicElement = createCustomElement('div', { class: 'comment' },
        createCustomElement('div', { class: 'header' },
            createCustomElement('img', { src: './static/profile.png', alt: 'avatar' }),
            createCustomElement('p', { innerHTML: `<span>${topic.username}</span> posted on <time>${topic.createdOn}</time>` }),
            createCustomElement('p', { class: 'post-content', textContent: topic.content })));

    topicElement.appendChild(await showComments(id));

    fragment.appendChild(topicElement);
    fragment.appendChild(showCommentForm(id));


    topicAndComentsContainer.textContent = null;
    topicAndComentsContainer.appendChild(fragment);

}


async function showComments(topicId) {
    let comments = await requests.getComments(topicId);

    let element = createCustomElement('div', { id: 'user-comment' },
        createCustomElement('div', { class: 'topic-name-wrapper' }));

    for (const cmt of comments) {
        let comment = createCustomElement('div', { class: 'topic-name' },
            createCustomElement('p', { innerHTML: `<strong>${cmt.username}</strong> commented on <time>${cmt.createdOn}</time>` }),
            createCustomElement('div', { class: 'post-content' },
                createCustomElement('p', { textContent: cmt.content })));

        element.appendChild(comment);
    }

    return element;
}

function showCommentForm(id) {
    let div = createCustomElement('div', { class: 'answer-comment' },
        createCustomElement('p', { innerHTML: '<span>currentUser</span> comment:' }));

    let innerDiv = createCustomElement('div', { class: 'answer' });

    let form = createCustomElement('form', { id: id },
        createCustomElement('textarea', { name: 'postText', id: 'comment', cols: '30', rows: '10' }),
        createCustomElement('div', null,
            createCustomElement('label', { for: 'username', innerHTML: 'Username <span class="red">*</span' }),
            createCustomElement('input', { type: 'text', name: 'username', id: 'username' })),
        createCustomElement('button', { textContent: 'Post' }));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let { postText, username } = Object.fromEntries(formData);

        let comment = {
            content: postText,
            username,
            createdOn: getDateTimeNow(),
            topicId: e.currentTarget.id
        };

        if (postText && username) {
            requests.createComment(comment);
            render.showTopic(id);
        }

    });

    innerDiv.appendChild(form);
    div.appendChild(innerDiv);

    return div;

}



export const render = {
    showTopicPreviews,
    showTopic,
    showComments
}