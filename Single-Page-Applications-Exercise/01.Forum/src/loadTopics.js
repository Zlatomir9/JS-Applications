import { loadComments } from "./comments.js";

const main = document.getElementsByTagName("main")[0];
const homeView = document.getElementById("homeView");
const allTopics = document.querySelector(".topic-title");
const section = document.querySelector(".theme-content");
const themeContentWrapper = document.getElementById("theme-content-wrapper");
const container = document.querySelector(".container");

section.remove();

let id;

export async function loadTopics() {
    try {
        const url = "http://localhost:3030/jsonstore/collections/myboard/posts";
        const response = await fetch(url);
        const data = await response.json();

        const content = Object.values(data).map(x => homeTopicTemplate(x));
        allTopics.replaceChildren(...content);
        main.replaceChildren(homeView);
    } catch (error) {
        alert(error.message);
    }
}

function homeTopicTemplate(data) {
    const topicContainer = document.createElement("div");
    topicContainer.classList.add("topic-container");
    topicContainer.innerHTML = `
    <div class="topic-name-wrapper" >
        <div class="topic-name">
        <a href="#" class="normal" id="${data._id}">
            <h2>${data.topicName}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${data.date}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${data.username}</span></p>
                </div>
            </div>
        </div>
        </div>
    </div>`;

    topicContainer.querySelector("a").addEventListener("click", showSelectedTopic);
    return topicContainer;
}

async function showSelectedTopic(e) {
    try {
        if (!e) {
            return;
        }
        if (e.target.tagName == "H2") {
            id = e.target.parentElement.id;
        } else if (e.target.tagName == "A") {
            id = e.target.id;
        }
        
        container.replaceChildren(section);

        loadTopicDetails(id);
        

    } catch (error) {
        alert(error.message);
    }
}

async function loadTopicDetails(id) {
    try {
        const url = `http://localhost:3030/jsonstore/collections/myboard/posts/${id}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            const error = data
            throw new Error(error.message);
        }

        const topicContainer = document.createElement("div");
        topicContainer.classList.add("theme-title");
        topicContainer.innerHTML = `
                            <div class="theme-name-wrapper">
                                <div class="theme-name">
                                    <h2>${data.topicName}</h2>
                                </div>
                            </div>`;

        const commentContainer = document.createElement("div");
        commentContainer.classList.add("comment");
        commentContainer.innerHTML = `
                            <div class="header">
                                <img src="./static/profile.png" alt="avatar">
                                    <p><span>${data.username}</span> posted on <time>${data.date}</time></p>
                                    <p class="post-content">${data.postText}</p>
                            </div>
                            <div id="user-comment">
                                <div class="topic-name-wrapper">
                                    <div class="topic-name">
                                        <p><strong></strong> commented on <time></time></p>
                                    </div>
                                    <div class="post-content">
                                        <p></p>
                                    </div>
                                </div>
                            </div>`;

        topicContainer.appendChild(commentContainer);
        themeContentWrapper.replaceChildren(topicContainer);
        loadComments(id);

    } catch (error) {
        alert(error.message)
    }
}