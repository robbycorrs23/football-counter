const saveEl = document.getElementById("save-el")
const countEl = document.getElementById("count-el")
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const currentDate = new Date();
const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`

let count = 0
let entries = [];

const storedItems = JSON.parse(localStorage.getItem("entries"))
if (storedItems) {
    entries = storedItems
    addToEntries();
}

function touchdown() {
    count += 7
    countEl.textContent = count
}

function fieldGoal() {
    count += 3
    countEl.textContent = count
}

function decrement() {
    if (count <= 0) {
        return
    } else {
        count -= 1
    }
    countEl.textContent = count
}

function render() {
    entries.unshift({counter: count, timeStamp: currentTime})
}

function addToEntries () {
    let listItems = ""
    for (let i=0; i < entries.length; i++) {
        listItems += `
    <li id="list-item">${entries[i].counter} <span>${entries[i].timeStamp}</span>
    </li>`
    }
    saveEl.innerHTML = listItems
}

function save() {
    render();
    addToEntries();
    localStorage.setItem("entries", JSON.stringify(entries))
    countEl.textContent = 0
    count = 0
}

deleteBtn.addEventListener("dblclick", deleteAll)

function deleteAll() {
    saveEl.textContent = ""
    count = 0
    entries = []
    localStorage.clear();
}

saveBtn.addEventListener('click', save)
