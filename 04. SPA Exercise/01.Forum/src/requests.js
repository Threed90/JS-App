async function getAllTopics() {
    return await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
        .then(res => {
            if (!res.ok) {
                throw new Error('Can not get topics!');
            }
            return res.json();
        })
        .then(data => data)
        .catch(err => alert(err.message));
}

async function getTopic(id) {
    
    let topic = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/` + id)
        .then(res => {
            if (!res.ok) {
                throw new Error('There is no such a topic!');
            }
            return res.json();
        })
        .then(data => data);

        return topic;
}

async function getComments(topicId) {
    let comments = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`)
        .then(res => res.json())
        .then(comments => comments);
    
    let needed =  Object.values(comments).filter(c => c.topicId == topicId);
    return needed
}

///maybe:
function createTopic(topic){
    
    fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method : 'POST',
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify({
            'name' : topic.name,
            'username' : topic.username,
            'content' : topic.content,
            'createdOn' : topic.createdOn
        })
    });
}

function createComment(comment){
    fetch(' http://localhost:3030/jsonstore/collections/myboard/comments', {
        method : 'POST',
        headers : { 'content-type' : 'application/json'},
        body : JSON.stringify(comment)
    })
    .then(res => {
        if(!res.ok){
            throw new Error('Can not create a comment!')
        }
    })
    .catch(err => alert(err.message));
}

export const requests = {
    getAllTopics,
    getTopic,
    getComments,
    createTopic,
    createComment
}