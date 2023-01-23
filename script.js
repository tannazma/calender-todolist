// import { isWeekend } from "./date-helpers.js";
function isWeekend(day) {
    return day % 7 === 0 || day % 7 === 6;
}

const calendar = document.querySelector("#app-calendar");



for (let day = 1; day <= 31; day++) {
    const date = new Date(Date.UTC(2018, 0, day));
    const options = { weekday: "short" };
    const dayName =new Intl.DateTimeFormat("en-US" ,options).format(date);
    console.log(dayName) 
    const weekend = isWeekend(day)
    console.log(weekend ? "weekend" : "")
    calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""}">${day}</div>`);
}