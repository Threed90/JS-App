import {render} from './render.js';

let homeMian = document.getElementById('home');
let topicMain = document.getElementById('topic-view');

async function loadHomePage(){
    hideAll();
    homeMian.style.display = 'block';

    await render.showTopicPreviews();
}


function loadTopicView(id){
    hideAll();
    topicMain.style.display = 'block';

    render.showTopic(id);
}

function hideAll(){
    homeMian.style.display = 'none'
    topicMain.style.display = 'none';
}
export const router = {
    '/' : loadHomePage,
    '/topic' : loadTopicView
}