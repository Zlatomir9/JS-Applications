const mainElement = document.getElementById("main");

mainElement.replaceChildren();

async function lockedProfile() {
    const url = "http://localhost:3030/jsonstore/advanced/profiles";

    const response = await fetch(url);
    const data = await response.json();

    let profileId = 1;

    Object.values(data).forEach(p => {
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        const profileImg = document.createElement("img");
        profileImg.classList.add("userIcon");
        profileImg.src = "./iconProfile2.png";
        profileDiv.appendChild(profileImg);

        const lockLabel = document.createElement("label");
        lockLabel.innerText = "Lock";
        profileDiv.appendChild(lockLabel);

        const lockInput = document.createElement("input");
        lockInput.type = "radio";
        lockInput.name = `user${profileId}Locked`;
        lockInput.value = "lock";
        lockInput.checked = "checked";
        profileDiv.appendChild(lockInput);

        const unlockLabel = document.createElement("label");
        unlockLabel.innerText = "Unlock";
        profileDiv.appendChild(unlockLabel);
        
        const unlockInput = document.createElement("input");
        unlockInput.type = "radio";
        unlockInput.name = `user${profileId}Locked`;
        unlockInput.value = "unlock";
        profileDiv.appendChild(unlockInput);

        const br = document.createElement("br");
        profileDiv.appendChild(br);

        const hr = document.createElement("hr");
        profileDiv.appendChild(hr);

        const usernameLabel = document.createElement("label");
        usernameLabel.innerText = "Username";
        profileDiv.appendChild(usernameLabel);

        const usernameInput = document.createElement("input");
        usernameInput.type = "text";
        usernameInput.name = `user${profileId}Username`;
        usernameInput.value = p.username;
        profileDiv.appendChild(usernameInput);
        usernameInput.disabled = true;
        usernameInput.readonly = true;

        const userDiv = document.createElement("div");
        userDiv.id = `user${profileId}HiddenFields`;
        userDiv.style.display = 'none';

        const hr2 = document.createElement("hr");
        userDiv.appendChild(hr2);

        const emailLabel = document.createElement("label");
        emailLabel.innerText = "Email";
        userDiv.appendChild(emailLabel);

        const emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.name = `user${profileId}Email`;
        emailInput.value = p.email;
        emailInput.disabled = true;
        emailInput.readonly = true;
        userDiv.appendChild(emailInput);

        const ageLabel = document.createElement("label");
        ageLabel.innerText = "Age";
        userDiv.appendChild(ageLabel);

        const ageInput = document.createElement("input");
        ageInput.type = "email";
        ageInput.name = `user${profileId}Age`;
        ageInput.value = p.age;
        ageInput.disabled = true;
        ageInput.readonly = true;
        userDiv.appendChild(ageInput);

        profileDiv.appendChild(userDiv);

        const btn = document.createElement("button");
        btn.innerHTML = "Show more";
        profileDiv.appendChild(btn);
        
        btn.addEventListener('click', (e) => {
            if (unlockInput.checked && e.target.textContent === 'Show more') {
                userDiv.style.display = 'block';
                btn.textContent = 'Hide it';
            } else if (unlockInput.checked && e.target.textContent === 'Hide it') {
                userDiv.style.display = 'none';
                btn.textContent = 'Show more';
            }
        })

        mainElement.appendChild(profileDiv);
    });
}