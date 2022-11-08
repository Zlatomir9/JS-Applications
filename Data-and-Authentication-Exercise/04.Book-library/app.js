const form = document.querySelector("form");
const header = form.querySelector("h3");
const formBtn = form.querySelector("button");

document.getElementById("loadBooks").addEventListener("click", loadAllBooks);
document.querySelector("form").addEventListener("submit", createOrEditBook);

let bookId = "";

async function loadAllBooks() {
    const tBody = document.querySelector("table tbody");
    const url = "http://localhost:3030/jsonstore/collections/books/";

    let response = await fetch(url);
    let data = await response.json();

    tBody.replaceChildren();
    Object.entries(data).forEach(([key, book]) => {
        let tr = htmlGenerator("tr", "", tBody);
        tr.id = key;
        htmlGenerator("td", `${book.title}`, tr);
        htmlGenerator("td", `${book.author}`, tr);

        let btnsTd = htmlGenerator("td", "", tr);

        let editBtn = htmlGenerator("button", "Edit", btnsTd);
        editBtn.addEventListener("click", editBook);

        let deleteBtn = htmlGenerator("button", "Delete", btnsTd);
        deleteBtn.addEventListener("click", deleteBook);
    });
}

async function editBook(e) {
    e.preventDefault();

    header.textContent = "Edit FORM";
    formBtn.textContent = "Save";

    bookId = e.target.parentNode.parentNode.id;

    form.querySelector("input[name=title]").value = e.target.parentNode.parentNode.children[0].textContent;
    form.querySelector("input[name=author]").value = e.target.parentNode.parentNode.children[1].textContent;
}

async function deleteBook(e) {
    let bookId = e.target.parentNode.parentNode.getAttribute("id");

    const url = `http://localhost:3030/jsonstore/collections/books/${bookId}`;
    const header = getHeader("DELETE");
    const response = await fetch(url, header);

    loadAllBooks();
}

async function createOrEditBook(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { title, author } = Object.fromEntries(formData);

    let bookData = {
        title,
        author
    };

    if (formBtn.textContent == "Save") {
        const url = `http://localhost:3030/jsonstore/collections/books/${bookId}`;

        if (!title || !author) {
            alert("All fields are required!");
            return;
        } else {
            const header = getHeader("PUT", bookData);
            const response = await fetch(url, header);
            const data = response.json();
        }

        header.textContent = "FORM";
        formBtn.textContent = "Submit";

    } else {
        const url = `http://localhost:3030/jsonstore/collections/books/`;

        if (!title || !author) {
            alert("All fields are required!");
            return;
        } else {
            const header = getHeader("POST", bookData);
            const response = await fetch(url, header);
            const data = response.json();
        }
    }

    loadAllBooks();
    form.reset();
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

function htmlGenerator(tag, content, parent) {
    let el = document.createElement(tag);
    el.textContent = content;

    if (parent) {
        parent.appendChild(el);
    }
    return el;
}