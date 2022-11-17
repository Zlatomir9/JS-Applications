import { getTopicFormData } from "./createTopic.js";
import { loadTopics } from "./loadTopics.js";

const container = document.querySelector('.container');
const main = document.querySelector('main');

window.addEventListener("load", loadTopics);
document.querySelector('a').addEventListener('click', showHome);

const form = document.querySelector("form");
form.addEventListener("submit", getTopicFormData);

function showHome() {
    container.replaceChildren(main);
 
    loadTopics();
 }