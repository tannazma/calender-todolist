// import { isWeekend } from "./date-helpers.js";
function isWeekend(day) {
    return day % 7 === 0 || day % 7 === 6;
}

const calendar = document.querySelector("#app-calendar");

const getDayName = day => {
    const date = new Date(Date.UTC(2018, 0, day));
    return new Intl.DateTimeFormat("en-US", {weekday: "short"}).format(date);
}

for (let day = 1; day <= 31; day++) {

    const dayName = getDayName(day);
    const weekend = isWeekend(day);

    calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""}">
    <div class="name" >${dayName}</div>${day}</div>`);
}