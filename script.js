
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
        name = `<div class="name" id="${dayName}">${dayName}</div>`;
    }

    const weekend = isWeekend(day);

    calendar.insertAdjacentHTML("beforeend", `<div id="${day}" class="day ${weekend ? "weekend" : ""}">
    ${name}${day}</div>`);
}

document.getElementById(new Date().getDate()).style.backgroundColor = "rgb(187 204 187)"

document.querySelectorAll("#app-calendar .day").forEach(dayDiv => {
    dayDiv.addEventListener("click", event => {
        showDialog();
        currentOpenDay = dayDiv;
        event.currentTarget.classList.toggle("selected");
    });
});

const backgroundDrop = document.querySelector('.background');
const dialog = document.querySelector('.dialogBox');
backgroundDrop.addEventListener('click', function (event) {
    if (event.target === backgroundDrop) {
        closeDialog();
    }
})

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
    if (inputTasks.value.trim() === '') { 
        inputTasks.value = "";
        document.querySelector('input').focus();
        alert('You have to put something!') 
        return
    }
    // console.log(inputTasks.value);
    const taskDiv = document.createElement('div');
    taskDiv.textContent = inputTasks.value;
    currentOpenDay.appendChild(taskDiv);
    taskDiv.classList.add('new-task');
    inputTasks.value = "";
    closeDialog();
}

const addEventButton = document.querySelector('.add-event');
addEventButton.addEventListener("click", addEvents)

function addEvents() {
    const inputEvents = document.querySelector('.input-event');
    if (inputEvents.value.trim() === '') { 
        inputEvents.value = ""
        document.querySelector('input').focus();
        alert('You have to put something!') 
        return 
    }
    // console.log(inputEvents.value);
    const eventDiv = document.createElement('div');
    eventDiv.textContent = inputEvents.value;
    currentOpenDay.appendChild(eventDiv);
    eventDiv.classList.add('new-event');
    inputEvents.value = "";
    closeDialog();
}
const nextButton = document.createElement('button');
nextButton.innerHTML = '&#8250';
nextButton.classList.add('nextButton');
nextButton.classList.add("btn");
nextButton.classList.add("btn-secondary");
document.querySelector('.buttonContainer').appendChild(nextButton)

const prevButton = document.createElement('button');
prevButton.innerHTML = '&#8249';
prevButton.classList.add('prevButton')
prevButton.classList.add("btn");
prevButton.classList.add("btn-secondary");
document.querySelector('.buttonContainer').appendChild(prevButton)

var day = new Date()
var currentDay = new Date().getDay()
var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();
// console.log(currentMonth.toString(), currentYear.toString())


nextButton.addEventListener('click', function () {
    currentMonth = currentMonth + 1;
    if (currentMonth > 11) {
        currentYear++;
        currentMonth = 0;
    }
    showMonthYear(currentMonth, currentYear);
})

prevButton.addEventListener('click', function () {
    currentMonth = currentMonth - 1;
    if (currentMonth < 0) {
        currentYear--;
        currentMonth = 11;
    }
    showMonthYear(currentMonth, currentYear);
})

function showMonthYear(month, year) {
    const monthAndYear = document.querySelector('.monthAndYear');
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthAndYear.textContent = monthNames[month] + " " + year
    document.body.prepend(monthAndYear)
}

const calendarHeading = document.querySelector('.monthAndYear');
showMonthYear(currentMonth, currentYear);

document.body.prepend(calendarHeading);

document.querySelectorAll("#app-calendar .day").value = currentDay;
console.log(currentDay, currentMonth, currentYear);
