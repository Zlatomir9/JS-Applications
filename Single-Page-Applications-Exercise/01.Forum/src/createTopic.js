import { loadTopics } from "./loadTopics.js";

const form = document.querySelector('form');

export function getTopicFormData(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { topicName, username, postText } = Object.fromEntries(formData);
    
    if (e.submitter.textContent === 'Post') {
        if (!topicName || !username || !postText) {
            alert('All fields are required!');
            return;
        }
        createTopic(topicName, username, postText);
    }
    form.reset();
}

async function createTopic(topicName, username, postText) {
    const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;

    let postData = {
        topicName,
        username,
        postText,
        date: new Date
    };

    const header = getHeader("POST", postData)
    const response = await fetch(url, header);

    loadTopics();
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