const enumIcon = {
    "Sunny": "&#x2600",
    "Partly sunny": "&#x26C5",
    "Overcast": "&#x2601",
    "Rain": "&#x2614",
    "Degrees": "&#176"
}

const forecastContainer = document.getElementById("forecast");

function attachEvents() {
    document.getElementById("submit").addEventListener('click', getForecast);
}

async function getForecast() {
    const url = "http://localhost:3030/jsonstore/forecaster/locations";
    const inputValue = document.getElementById("location").value;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const city = data.find(x => x.name === inputValue);

        createForecast(city.code);
    } catch {
        forecastContainer.style.display = "block";
        forecastContainer.textContent = "Error";
    }
}

async function createForecast(code) {
    const currentSection = document.getElementById("current");

    const upcomingContainer = document.getElementById("upcoming");

    const urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    const urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    try {
        const todayResponse = await fetch(urlToday);
        const dataToday = await todayResponse.json();

        const upcomingResponse = await fetch(urlUpcoming);
        const dataUpcoming = await upcomingResponse.json();

        forecastContainer.style.display = "block";
        const todayHTML = createToday(dataToday);
        currentSection.appendChild(todayHTML);

        const upcomingHTML = createUpcoming(dataUpcoming);
        upcomingContainer.appendChild(upcomingHTML);
    } catch {
        forecastContainer.style.display = "block";
        forecastContainer.textContent = "Error";
    }
}

function createUpcoming(data) {
    const container = document.createElement("div");
    container.classList.add("forecast-info");

    data.forecast.forEach(data => {
        const spanHolder = generateSpans(data);
        container.appendChild(spanHolder);
    });

    return container;
}

function generateSpans(data) {
    const { condition, high, low } = data

    const span = document.createElement("span");
    span.classList.add("upcoming");

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("symbol");
    iconSpan.innerHTML = enumIcon[condition];

    const tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.innerHTML = `${low}${enumIcon["Degrees"]}/${high}${enumIcon["Degrees"]}`;

    const conditionSpan = document.createElement("span");
    conditionSpan.classList.add("forecast-data");
    conditionSpan.textContent = condition;

    span.appendChild(iconSpan);
    span.appendChild(tempSpan);
    span.appendChild(conditionSpan);

    return span;
}

function createToday(data) {
    const { condition, high, low } = data.forecast;
    const container = document.createElement("div");

    container.classList.add("forecasts");

    const conditionIconSpan = document.createElement("span");
    conditionIconSpan.classList.add("condition", "symbol");
    conditionIconSpan.innerHTML = enumIcon[condition];

    const conditionSpan = document.createElement("span");
    conditionSpan.classList.add("condition");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("forecast-data");
    nameSpan.textContent = data.name;

    const conditionTxtSpan = document.createElement("span");
    conditionTxtSpan.classList.add("forecast-data");
    conditionTxtSpan.textContent = condition;

    const tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.innerHTML = `${low}${enumIcon["Degrees"]}/${high}${enumIcon["Degrees"]}`;

    conditionSpan.appendChild(nameSpan);
    conditionSpan.appendChild(tempSpan);
    conditionSpan.appendChild(conditionTxtSpan);

    container.appendChild(conditionIconSpan);
    container.appendChild(conditionSpan);
    return container;
}

attachEvents();