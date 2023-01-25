// import { isWeekend } from "./date-helpers.js";
let currentOpenDay;
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

document.querySelectorAll("#app-calendar .day").forEach(dayDiv => {
    dayDiv.addEventListener("click", event => {
        showDialog(); 
        currentOpenDay = dayDiv;
        event.currentTarget.classList.toggle("selected");
    });
});

function showDialog() {
    document.querySelector('#buy-dialog').style.display = 'grid';
    document.querySelector('input').focus();
}

function closeDialog() {
    document.querySelector('#buy-dialog').style.display = 'none';
}

const addTaskButton = document.querySelector('.add-task');
addTaskButton.addEventListener("click", addTasks)

function addTasks() {
    const inputTasks = document.querySelector('.input-task');
    // console.log(inputTasks.value);
    const taskDiv = document.createElement('div');
    taskDiv.textContent = inputTasks.value;
    currentOpenDay.appendChild(taskDiv);
    taskDiv.classList.add('new-task');
}

const addEventButton = document.querySelector('.add-event');
addEventButton.addEventListener("click", addEvents)

function addEvents() {
    const inputEvents = document.querySelector('.input-event');
    // console.log(inputEvents.value);
    const eventDiv = document.createElement('div');
    eventDiv.textContent = inputEvents.value;
    currentOpenDay.appendChild(eventDiv);
    eventDiv.classList.add('new-event');
}
