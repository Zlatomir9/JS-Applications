window.addEventListener("DOMContentLoaded", onLoadHTML);
document.getElementById("addForm").addEventListener("submit", createCatch);

document.querySelector(".load").addEventListener("click", onLoadCatches);
document.getElementById("logout").addEventListener("click", onLogout);

const catches = document.querySelector('#catches');

async function onLogout() {
    const url = "http://localhost:3030/users/logout";

    const header = getHeader("GET", "");

    const response = await fetch(url, header);
    sessionStorage.clear();
    onLoadHTML();
}

function onLoadHTML() {
    const token = sessionStorage.getItem("accessToken");
    const username = document.querySelector("p.email span");
    const addBtn = document.querySelector(".add");

    if (token) {
        document.getElementById("guest").style.display = "none";
        document.getElementById("user").style.display = "inline-block";
        username.innerHTML = sessionStorage.getItem("email");
        addBtn.disabled = false;
    } else {
        document.getElementById("guest").style.display = "inline-block";
        document.getElementById("user").style.display = "none";
        username.innerHTML = "guest";
        addBtn.disabled = true;
    }
}

async function onLoadCatches() {
    try {
        const url = "http://localhost:3030/data/catches";

        const response = await fetch(url);
        const data = await response.json();

        catches.replaceChildren();

        Object.values(data).forEach(c => {
            let catchDiv = document.createElement("div");
            catchDiv.classList.add("catch");

            let anglerLabel = document.createElement("label");
            anglerLabel.innerText = "Angler";
            catchDiv.appendChild(anglerLabel);

            let anglerInput = document.createElement("input");
            anglerInput.type = "text";
            anglerInput.classList.add("angler");
            anglerInput.value = c.angler;
            catchDiv.appendChild(anglerInput);

            let weightLabel = document.createElement("label");
            weightLabel.innerText = "Weight";
            catchDiv.appendChild(weightLabel);

            let weightInput = document.createElement("input");
            weightInput.type = "text";
            weightInput.classList.add("weight");
            weightInput.value = c.weight;
            catchDiv.appendChild(weightInput);

            let speciesLabel = document.createElement("label");
            speciesLabel.innerText = "Species";
            catchDiv.appendChild(speciesLabel);

            let speciesInput = document.createElement("input");
            speciesInput.type = "text";
            speciesInput.classList.add("species");
            speciesInput.value = c.species;
            catchDiv.appendChild(speciesInput);

            let locationLabel = document.createElement("label");
            locationLabel.innerText = "Location";
            catchDiv.appendChild(locationLabel);

            let locationInput = document.createElement("input");
            locationInput.type = "text";
            locationInput.classList.add("location");
            locationInput.value = c.location;
            catchDiv.appendChild(locationInput);

            let baitLabel = document.createElement("label");
            baitLabel.innerText = "Bait";
            catchDiv.appendChild(baitLabel);

            let baitInput = document.createElement("input");
            baitInput.type = "text";
            baitInput.classList.add("bait");
            baitInput.value = c.bait;
            catchDiv.appendChild(baitInput);

            let timeLabel = document.createElement("label");
            timeLabel.innerText = "Capture Time";
            catchDiv.appendChild(timeLabel);

            let timeInput = document.createElement("input");
            timeInput.type = "number";
            timeInput.classList.add("captureTime");
            timeInput.value = c.captureTime;
            catchDiv.appendChild(timeInput);

            let updateBtn = document.createElement("button");
            updateBtn.classList.add("update");
            updateBtn.innerText = "Update";
            updateBtn.setAttribute("data-id", c._id);
            updateBtn.setAttribute("owner-id", c._ownerId);
            updateBtn.addEventListener("click", updateCatch);
            catchDiv.appendChild(updateBtn);

            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.innerText = "Delete";
            deleteBtn.setAttribute("data-id", c._id);
            deleteBtn.setAttribute("owner-id", c._ownerId);
            deleteBtn.addEventListener("click", deleteCatch);
            catchDiv.appendChild(deleteBtn);

            catches.appendChild(catchDiv);
        });

    } catch (error) {
        alert(error.message);
    }

    toggleBtns();
}

async function updateCatch(e) {
    let catchId = e.target.getAttribute("data-id");

    let [angler, weight, species, location, bait, captureTime] = e.target.parentNode.querySelectorAll("input");

    let catchData = {
        angler: angler.value,
        weight: weight.value,
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: captureTime.value
    }

    try {
        const url = `http://localhost:3030/data/catches/${catchId}`;
        const header = getHeader("PUT", catchData);
        const response = await fetch(url, header);
        
        if (response.status != 200 || !response.ok) {
            let data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        alert(error.message);
    }

    onLoadCatches();
}

async function deleteCatch(e) {
    let catchId = e.target.getAttribute("data-id");

    const url = `http://localhost:3030/data/catches/${catchId}`;
    const header = getHeader("DELETE", "");
    const response = await fetch(url, header);

    onLoadCatches();
}

function createCatch(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    onCreateCatch(data);
}

async function onCreateCatch(body) {

    const url = "http://localhost:3030/data/catches";
    const header = getHeader("POST", body);
    const response = await fetch(url, header);
    const data = await response.json();
    onLoadCatches();
    return data;
}

function toggleBtns() {
    const allBtns = catches.querySelectorAll("button");

    allBtns.forEach(button => {
        if (sessionStorage._id === button.getAttribute("owner-id")) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    })
}

function getHeader(method, body) {
    const token = sessionStorage.getItem("accessToken");

    const header = {
        method: `${method}`,
        headers: {
            "Content-type": "application/json",
            "X-Authorization": token
        },
    }
    if (body) {
        header.body = JSON.stringify(body);
    }

    return header;
}