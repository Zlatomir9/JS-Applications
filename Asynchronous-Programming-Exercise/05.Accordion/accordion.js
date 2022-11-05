async function solution() {
    const mainSection = document.getElementById("main");
    const url = "http://localhost:3030/jsonstore/advanced/articles/list";
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(a => {
        const accordionDiv = document.createElement("div");
        accordionDiv.classList.add("accordion");

        const headDiv = document.createElement("div");
        headDiv.classList.add("head");

        const headSpan = document.createElement("span");
        headSpan.innerHTML = a.title;

        const headBtn = document.createElement("button");
        headBtn.classList.add("button");
        headBtn.id = a._id;
        headBtn.innerHTML = "More";

        const extraDiv = document.createElement("div");
        extraDiv.classList.add("extra");

        const extraDivP = document.createElement("p");
        
        extraDiv.appendChild(extraDivP);
        headDiv.appendChild(headSpan);
        headDiv.appendChild(headBtn);
        accordionDiv.appendChild(headDiv);
        accordionDiv.appendChild(extraDiv);
        mainSection.appendChild(accordionDiv);

        headBtn.addEventListener('click', showHiddenInfo);
    });
}

async function showHiddenInfo(e) {
    bntId = e.target.id;
    let div = e.target.parentNode.parentNode.querySelector(".extra");
    let p = div.querySelector("p");

    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${bntId}`;
    const response = await fetch(url);
    const data = await response.json();

    if (e.target.textContent === "More") {
        e.target.textContent = "Less";
        div.style.display = 'block';
        p.textContent = data.content;
    } else if (e.target.textContent === "Less") {
        e.target.textContent = "More";
        div.style.display = 'none';
    }
}

solution();