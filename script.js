
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
        const date = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), day));
        const dayName = getDayName(day);
        name = `<div class="name" id="${dayName}">${dayName}</div>`;
    }

    const weekend = isWeekend(day);

    let _day = day;

    const firstDayOfTheMonth = getDayNameOfCurrentMonth(1);
    switch (firstDayOfTheMonth) {
        case 'Sun':
            if (day < 7) {
                _day = '';
                toSubtract = 6
            }
            break
        case 'Sat':
            if (day < 6) {
                _day = '';
                toSubtract = 5
            }
            break
        case 'Fri':
            if (day < 5) {
                _day = '';
                toSubtract = 4
            }
            break
        case 'Thu':
            if (day < 4) {
                _day = '';
                toSubtract = 3
            }
            break
        case 'Wed':
            if (day < 3) {
                _day = '';
                toSubtract = 2
            }
            break
        case 'Tue':
            if (day < 2) {
                _day = '';
                toSubtract = 1
            }
            break
    }

    const writtenDay = Number.isInteger(_day) ? (_day - toSubtract) : _day

    calendar.insertAdjacentHTML("beforeend", `<div id="${writtenDay}" class="day ${weekend ? "weekend" : ""}">
    ${name}${writtenDay}</div>`);
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
console.log(currentDay, day, currentMonth, currentYear);


// var app = new Vue({
//     el: '#vue-root',
//     template:`<div>
//     <input v-model="message" />
//     <button :disabled="message.trim()===''" @click="doSomething()">Add</button>
//     </div>`,
//     data: {
//         message: ''
//     },
//     methods:{
//         doSomething(){
//             alert(this.message)
//         }
//     }
// })