import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const townsRoot = document.getElementById("towns");
const resultRoot = document.getElementById("result");
document.querySelector("button").addEventListener("click", search);

update();

function searchTemplate(townsList, match) {
   const ul = html`
      <ul>
         ${townsList.map(townsList => createLiTemplate(townsList, match))}
      </ul>
   `;

   return ul;
}

function createLiTemplate(town, match) {
   return html `
      <li class="${town.includes(match) ? "active" : ""}">${town}</li>
   `;
}

function update(text) {
   const ul = searchTemplate(towns, text);
   render(ul, townsRoot);
}

function search(e) {
   const textNode = document.getElementById("searchText");
   const text = textNode.value;
   update(text);
   countResult();
}

function countResult() {
   const count = document.querySelectorAll(".active");
   const countResult = count ? html `<p>${count.length} matches found</p>` : '';

   render(countResult, resultRoot);
}