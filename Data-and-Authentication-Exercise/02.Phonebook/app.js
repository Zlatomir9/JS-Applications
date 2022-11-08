function attachEvents() {
    document.getElementById("btnLoad").addEventListener("click", onLoadAllNumbers);
    document.getElementById("btnCreate").addEventListener("click", handleCreate);
}

function handleCreate() {
    const person = document.getElementById("person");
    const phone = document.getElementById("phone");

    onCreateNumber(person.value, phone.value);
    person.value = "";
    phone.value = "";
}

function renderRecord(data) {
    const ul = document.getElementById("phonebook");
    ul.innerHTML = "";

    Object.values(data).forEach(r => {
        const li = document.createElement("li");
        li.textContent = `${r.person}: ${r.phone}`;
        li.setAttribute("data-id", r._id);

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", handleDelete);
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

function handleDelete(e) {
    const li = e.target.parentElement;
    const id = li.getAttribute("data-id");
    onDeleteNumber(id);
    li.remove();
}

async function onLoadAllNumbers() {
    const url = "http://localhost:3030/jsonstore/phonebook";
    const response = await fetch(url);
    const data = await response.json();

    return renderRecord(data);
}

async function onCreateNumber(person, phone) {
    const url = "http://localhost:3030/jsonstore/phonebook";
    const body = {
        person,
        phone
    };

    const header = getHeader("POST", body);
    const response = await fetch(url, header);
    const data = await response.json();
    
    onLoadAllNumbers();
    return data;
}

async function onDeleteNumber(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;

    const header = getHeader("DELETE", null);
    const response = await fetch(url, header);
    const data = await response.json();
    return data;
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

attachEvents();