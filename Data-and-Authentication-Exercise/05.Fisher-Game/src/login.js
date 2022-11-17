document.getElementById("login-form").addEventListener("submit", login);
document.querySelectorAll("a").forEach(x => x.classList.remove("active"));
document.getElementById("login").classList.add("active");
document.getElementById("user").style.display = "none";

const errorP = document.querySelector("p.notification");

async function login(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    if (email == '' || password == '') {
        errorP.textContent = "All fields are required!";
        return;
    } else {
        onLogin(email, password);
    }
}

async function onLogin(email, password) {
    const url = "http://localhost:3030/users/login";
    const body = {
        email,
        password
    };
    const header = getHeader("POST", body);

    try {
        const response = await fetch(url, header);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            form.reset();
            throw new Error(error.message)
        }

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('_id', data._id);

        window.location = "./index.html";
        return data;
    } catch (error) {
        errorP.textContent = error.message;
    }
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