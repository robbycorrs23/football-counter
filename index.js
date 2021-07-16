const saveEl = document.getElementById("save-el")
const homeCountEl = document.getElementById("home-count")
const awayCountEl = document.getElementById("away-count")
const turnBtn = document.getElementById("turn-btn")
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const dateGrab = new Date();
let month = dateGrab.getMonth() + 1

let homeCount = 0;
let awayCount = 0;
let entries = [];
let homeTeamTurn = true;

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const storedItems = JSON.parse(localStorage.getItem("entries"))
if (storedItems) {
    entries = storedItems
    addToEntries();
}

function touchdown() {
    if (homeTeamTurn) {
        homeCount += 7
    } else if (!homeTeamTurn) {
        awayCount += 7
    }
    addScore()
}

function fieldGoal() {
    if (homeTeamTurn) {
        homeCount += 3
    } else if (!homeTeamTurn) {
        awayCount += 3
    }
    addScore()
}

function addScore () {
    if (homeTeamTurn) {
        homeCountEl.textContent = homeCount
    } else if (!homeTeamTurn) {
        awayCountEl.textContent = awayCount
    }
}

function decrement() {
    if (homeTeamTurn) {
        if (homeCount <= 0 ) {
            return
        } else {
            homeCount -= 1
        }
    } else if (!homeTeamTurn) {
        if (awayCount <= 0 ) {
            return
        } else {
            awayCount -= 1
        }
    }
    addScore()
}

function render() {
    entries.unshift({ home: homeCount, away: awayCount, timeStamp: currentDate })
}

function addToEntries() {
    let listItems = ""
    for (let i = 0; i < entries.length; i++) {
        listItems += `
    <li id="list-item">H:${entries[i].home} A:${entries[i].away} <span>${entries[i].timeStamp}</span>
    </li>`
    }
    saveEl.innerHTML = listItems
}

function save() {
    render();
    addToEntries();
    localStorage.setItem("entries", JSON.stringify(entries))
    homeCountEl.textContent = 0
    awayCountEl.textContent = 0
    homeCount = 0
    awayCount = 0
}

deleteBtn.addEventListener("dblclick", deleteAll)

function deleteAll() {
    saveEl.textContent = ""
    homeCount = 0
    awayCount = 0
    entries = []
    localStorage.clear();
}

turnBtn.addEventListener("click", switchTeams)

function switchTeams () {
    homeTeamTurn = !homeTeamTurn
}

saveBtn.addEventListener('click', save)

const dateNow = monthNames[month]
const currentDate = `${dateNow}.${dateGrab.getDate()}`
