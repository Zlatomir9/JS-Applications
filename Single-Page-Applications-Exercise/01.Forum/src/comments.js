const form = document.querySelector('.answer-comment form');

form.addEventListener('submit', getCommentData);

let topicId;

export async function loadComments(id) {
    const userComment = document.getElementById('user-comment');
    topicId = id;
    
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
        const data = await response.json();

        if (!response.ok){
            const error = data;
            throw new Error(error.message);
        }

        userComment.replaceChildren();

        const comments = Object.values(data)
            .filter(x => x.postId === topicId)
            .map(x => commentTemplate(x));

        userComment.replaceChildren(...comments);

    } catch(error){
        alert(error.message)
    }
}

async function getCommentData(e) {
    e.preventDefault();
    
    const dataForm = new FormData(e.target);
    const content = dataForm.get('postText');
    const username = dataForm.get('username');

    if (!content || !username) {
        alert('All fields are required!');
        return;
    }
    createComment(content, username);
    form.reset();
}

async function createComment(content, username) {
    try {
        const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
        let commentData = {
            content,
            username,
            postId: topicId,
            date: new Date
        };
    
        const header = getHeader("POST", commentData)
        const response = await fetch(url, header);

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        
        loadComments(topicId);

    } catch (error) {
        alert(error.message);
    }
}

function commentTemplate(data) {

    const container = document.createElement("div")
    container.classList.add("topic-name-wrapper")
    container.innerHTML = `
                    <div class="topic-name">
                        <p><strong>${data.username}</strong> commented on <time>${data.date}</time></p>
                        <div class="post-content">
                            <p>${data.content}</p>
                        </div>
                    </div>`;

    return container;
}

function getHeader(method, body) {
    const header = {
        method: `${method}`,
        headers: {
            "Content-type": "application/json",
        },
    }
    if (body) {
        header.body = JSON.stringify(body);
    }

    return header;
}