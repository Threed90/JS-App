import { router } from './router.js';
import { requests } from './requests.js';
import { getDateTimeNow } from './utilities.js';


// let createForm = document.querySelector('#home .new-topic-border form');
// let isCancelButton = false;

function loadHomePageEvent() {

    document.querySelector('header nav').addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName == 'A') {
            let url = new URL(e.target.href);

            router[url.pathname]();
        }

    });

    document.querySelector('#home .topic-title').addEventListener('click', (e) => {

        e.preventDefault();
        if (e.target.tagName == 'H2') {
            let url = new URL(e.target.parentNode.href);

            if (url.pathname == '/') {
                router[url.pathname]();
            } else {
                let id = url.pathname.substring(1);

                router['/topic'](id)
            }
        }
    });

    document.querySelector('#topic-view').addEventListener('click', (e) => {
        if (e.target.tagName == 'H2') {
            e.preventDefault();
            let url = new URL(e.target.parentNode.href);
            router[url.pathname]();
        }
    });
}
{/* <div class="new-topic-title">
                        <label for="topicName">Title <span class="red">*</span></label>
                        <input type="text" name="topicName" id="topicName">
                    </div>
                    <div class="new-topic-title">
                        <label for="username">Username <span class="red">*</span></label>
                        <input type="text" name="username" id="username">
                    </div>
                    <div class="new-topic-content">
                        <label for="postText">Post <span class="red">*</span></label>
                        <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
                    </div>
                    <div class="new-topic-buttons">
                        <button class="cancel">Cancel</button>
                        <button class="public">Post</button>
                    </div> */}
const title = document.getElementById('topicName');
const usernameElement = document.getElementById('username');
const contentElement = document.getElementById('postText');

function loadHomePageFormEvent() {

    document.querySelector('.new-topic-buttons ').addEventListener('click', (e) => {
        if (e.target.className == 'cancel') {
            //isCancelButton = true;
            title.value = '';
            usernameElement.value = '';
            contentElement.value = '';
        } else if (e.target.className == 'public') {
            //isCancelButton = false;
            let name = title.value;
            let username = usernameElement.value;
            let content = contentElement.value;

            if (name && username && content) {
                let topic = {
                    name,
                    username,
                    content,
                    createdOn: getDateTimeNow()
                };
                requests.createTopic(topic);
                title.value = '';
                usernameElement.value = '';
                contentElement.value = '';
            }
        }
        router['/']();
    });
    // createForm.addEventListener('submit', async (e) => {
    //     e.preventDefault();

    //     if(isCancelButton){
    //         createForm.reset();
    //         router['/']();
    //     } else {


    //         let formData = new FormData(e.currentTarget);

    //         let {topicName, username, postText} = Object.fromEntries(formData);

    //         let topic = {
    //             name : topicName,
    //             username,
    //             content : postText,
    //             createdOn : getDateTimeNow()
    //         };

    //         if(topicName && username && postText){
    //             requests.createTopic(topic);
    //             await router['/']();
    //             createForm.reset();
    //         }
    //     }
    // });
}





export const listener = {
    loadHomePageEvent,
    loadHomePageFormEvent
}