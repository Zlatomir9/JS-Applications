const url = "http://localhost:3030/jsonstore/collections/students";

window.addEventListener("DOMContentLoaded", getStudents);
document.getElementById("form").addEventListener("submit", createStudent);

async function getStudents() {
    const tBody = document.getElementById("results").children[1];

    let response = await fetch(url);
    let data = await response.json();

    tBody.replaceChildren();

    Object.values(data).forEach(x => {
        let tr = htmlGenerator('tr', '', tBody);
        htmlGenerator('td', `${x.firstName}`, tr);
        htmlGenerator('td', `${x.lastName}`, tr);
        htmlGenerator('td', `${x.facultyNumber}`, tr);
        htmlGenerator('td', `${x.grade}`, tr);
    })
}

async function createStudent(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { firstName, lastName, facultyNumber, grade } = Object.fromEntries(formData);

    if (!firstName || !lastName || !facultyNumber || !grade) {
        alert('All fields are required!');
    } else {
        let studentData = {
            firstName,
            lastName,
            facultyNumber,
            grade
        };

        const header = getHeader("POST", studentData);
        const response = await fetch(url, header);
        const data = response.json();

        getStudents();
    }
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