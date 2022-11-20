import { html, render } from "./node_modules/lit-html/lit-html.js";

const tbody = document.querySelector("tbody");
document.querySelector('#searchBtn').addEventListener('click', onClick);

const url = 'http://localhost:3030/jsonstore/advanced/table';

getTableData();

async function getTableData() {
   const response = await fetch(url);
   const data = await response.json();
   
   const result = Object.values(data).map(x => createTableRow(x));

   updateTable(result);
}

function createTableRow(data) {
   return html`
      <tr id=${data._id} class=>
         <td>${data.firstName} ${data.lastName}</td>
         <td>${data.email}</td>
         <td>${data.course}</td>
      </tr>`;
}

function updateTable(students) {
   render(students, tbody);
}

function onClick(e) {
   e.preventDefault();

   const rows = document.querySelectorAll("tbody tr");
   const inputElement = document.getElementById("searchField");
   const inputText = inputElement.value.toLowerCase();

   for (let row of rows) {
      row.removeAttribute('class', 'select');
      const rowText = row.textContent.toLowerCase();

      if (rowText.includes(inputText) && inputText !== '') {
         row.className = 'select';
      }
   }
   inputElement.value = '';
}
