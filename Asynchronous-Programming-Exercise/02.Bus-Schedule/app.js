function solve() {
    let info = document.querySelector("#info span")
    let departBtn = document.querySelector("#depart");
    let arriveBtn = document.querySelector("#arrive");
    let stopId = "depot";

    async function depart() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`);
            const data = await response.json();

            departBtn.disabled = true;
            arriveBtn.disabled = false;
            info.textContent = `Next stop ${data.name}`
        } catch (error) {
            info.textContent = "Error";
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    async function arrive() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`);
            const data = await response.json();

            departBtn.disabled = false;
            arriveBtn.disabled = true;
            stopId = data.next;
            info.textContent = `Arriving at ${data.name}`;
        } catch {
            info.textContent = "Error";
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();