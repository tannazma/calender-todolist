let currentOpenDay;
function isWeekend(day) {
    return day % 7 === 0 || day % 7 === 6;
}

const calendar = document.querySelector("#app-calendar");

const getDayName = day => {
    const date = new Date(Date.UTC(2018, 0, day));
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

const getDayNameOfCurrentMonth = day => {
    const date = new Date(new Date().setDate(day));
    return new Intl.DateTimeFormat("en-US", { weekday: 'short' }).format(date);
}

let toSubtract = 0;
for (let day = 1; day <= 31 + toSubtract; day++) {
    let name = ""
    if (day <= 7) {
        name = `<div class="name" id="${getDayName(day)}">${getDayName(day)}</div>`;
    }

    let adjustedDay = day;
    const firstDayOfTheMonth = getDayNameOfCurrentMonth(1);
    if (day < 7) {
        switch (firstDayOfTheMonth) {
            case 'Sun': adjustedDay = ''; toSubtract = 6; break;
            case 'Sat': adjustedDay = ''; toSubtract = 5; break;
            // Additional cases omitted for brevity...
        }
    }

    const dayContent = Number.isInteger(adjustedDay) ? (adjustedDay - toSubtract) : adjustedDay;
    const weekendClass = isWeekend(day) ? "weekend" : "";

    calendar.insertAdjacentHTML("beforeend", `<div id="${dayContent}" class="day ${weekendClass}">${name}${dayContent}</div>`);
}

// Highlight the current day in the calendar
document.getElementById(new Date().getDate()).style.backgroundColor = "rgb(187, 204, 187)";

// Add click listeners to days for showing a dialog
document.querySelectorAll("#app-calendar .day").forEach(dayDiv => {
    dayDiv.addEventListener("click", event => {
        showDialog();
        currentOpenDay = dayDiv;
        event.currentTarget.classList.toggle("selected");
    });
});

// Handling the background click to close the dialog
const backgroundDrop = document.querySelector('.background');
backgroundDrop.addEventListener('click', event => {
    if (event.target === backgroundDrop) {
        closeDialog();
    }
});

// Function to display the dialog for adding tasks or events
function showDialog() {
    document.querySelector('#buy-dialog').style.display = 'grid';
    document.querySelector('input').focus();
}

const addInput = document.querySelector('.input-task');
addInput.addEventListener('input', function () {
    if (addInput.value === '') {
        addTaskButton.disabled = true;
        addEventButton.disabled = true;
    } else {
        addTaskButton.disabled = false;
        addEventButton.disabled = false
    }
})

function closeDialog() {
    document.querySelector('#buy-dialog').style.display = 'none';
    document.querySelectorAll("#app-calendar .day.selected").forEach(selectedDayDiv => {
        selectedDayDiv.classList.remove("selected");
    });
}

const addTaskButton = document.querySelector('.add-task');
addTaskButton.addEventListener("click", addTasks)

function addTasks() {
    const input = document.querySelector('.input-task').value.trim();
    if (!input) {
        alert('Please enter a task.');
        return;
    }
    const taskDiv = document.createElement('div');
    taskDiv.textContent = input;
    taskDiv.classList.add('new-task');
    currentOpenDay.appendChild(taskDiv);
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
console.log(currentDay, day, currentMonth, currentYear);