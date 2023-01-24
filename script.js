// import { isWeekend } from "./date-helpers.js";
function isWeekend(day) {
    return day % 7 === 0 || day % 7 === 6;
}

const calendar = document.querySelector("#app-calendar");

const getDayName = day => {
    const date = new Date(Date.UTC(2018, 0, day));
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

for (let day = 1; day <= 31; day++) {
    let name = ""
    if (day <= 7) {

        const dayName = getDayName(day);
        name = `<div class="name" >${dayName}</div>`;
    }


    const weekend = isWeekend(day);

    calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""}">
    ${name}${day}</div>`);
}

document.querySelectorAll("#app-calendar .day").forEach(day => {
    day.addEventListener("click", event => {
        showDialog();
        event.currentTarget.classList.toggle("selected");
    });
});

function showDialog() {
    document.querySelector('#buy-dialog').style.display = 'grid';
}

function closeDialog() {
    document.querySelector('#buy-dialog').style.display = 'none';
}
