document.getElementById("register-form").addEventListener("submit", registerUser);
document.querySelectorAll("a").forEach(x => x.classList.remove("active"));
document.getElementById("register").classList.add("active");
document.getElementById("user").style.display = "none";

const errorP = document.querySelector("p.notification");

function registerUser(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password, rePass } = Object.fromEntries(formData);

    if (password !== rePass) {
        errorP.textContent = 'Passwords didn\'t match';
        return;
    }
    if (!email || !password || !rePass) {
        errorP.textContent = 'All fields are required!'
        return;
    } 
    else {
        onRegister(email, password);
    }
}

async function onRegister(email, password) {
    const url = "http://localhost:3030/users/register";
    const body = {
        email,
        password
    };
    const header = getHeader("POST", body);

    try {
        const response = await fetch(url, header);
        const data = await response.json();

        if(!response.ok || response.status != 200) {
            form.reset();
            throw new Error (data.message);
        }

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('_id', data._id);

        window.location = "./index.html";
        return data;
    } catch (e) {
        errorP.textContent = e.message;
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