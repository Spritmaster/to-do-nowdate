// MONTHS
const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
]

// SELECTORS
const body = document.querySelector("body")
const header = document.querySelector("header")
const todoList = document.querySelector(".todo-list")
const form = document.querySelector(".main-form")
const input = document.querySelector(".main-input")
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const modalInput = document.querySelector(".modal-form > input")

// TIME Elements
const soniya = document.querySelector(".soniya")
const daqiqa = document.querySelector(".daqiqa")
const soat = document.querySelector(".soat")
const kun = document.querySelector(".kun")
const oy = document.querySelector(".oy")

function time() {
    let nowDate = new Date()
    let month = months[nowDate.getMonth()]
    let day = nowDate.getDate()
    oy.textContent = month
    kun.textContent = day

    let hours = nowDate.getHours().toString().padStart(2, "0")
    let minutes = nowDate.getMinutes().toString().padStart(2, "0")
    let seconds = nowDate.getSeconds().toString().padStart(2, "0")
    soat.textContent = hours
    daqiqa.textContent = minutes
    soniya.textContent = seconds

    return `${day}-${month},${hours}:${minutes}`
}

setInterval(() => time(), 1000)



let todos = JSON.parse(localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : []

function setItem() {
    localStorage.setItem("list", JSON.stringify(todos))

}


function errorMessage(element, value) {
    if (value) {
        element.setAttribute("placeholder", "Eslatma...")
        element.classList.remove("input-error")
    } else {
        element.setAttribute("placeholder", "Eslatmani kriting...")
        element.classList.add("input-error")
    }

}

form.addEventListener("submit", function (e) {
    e.preventDefault()
    let inputVal = input.value.trim()
    if (inputVal) {
        todos.push({ text: inputVal, time: time(), complated: false })
        setItem()
        createList()
    }
    errorMessage(input, inputVal)
    form.reset()
})

function createList() {
    let todos = JSON.parse(localStorage.getItem("list"))
    todoList.innerHTML = ""
    todos.forEach((todo, i) => {
        todoList.innerHTML += ` 
        <li ondblclick=(complated(${i})) class="todo-item ${todo.complated == true ? "complated" : ""}">
            <span>${todo.text}</span>
             <span>${todo.time}</span>
             <button onclick=(editTodo(${i}))><img src="./images/svg/pen.svg" alt="edit"></button>
             <button onclick=(deletetodo(${i}))><img src="./images/svg/delete.svg" alt="delete"></button>
        </li> `
    })
}

createList()

let editTodoIndex

function editTodo(id) {
    editTodoIndex = id
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

document.querySelector(".modal-form").addEventListener("submit", (e) => {
    e.preventDefault()
    let inputVal = modalInput.value.trim()
    if (inputVal) {
        todos.splice(editTodoIndex, 1, { text: inputVal, time: time(), complated: false })

        setItem()
        createList()
        editedClose()
    }
    errorMessage(modalInput, inputVal)
    modalInput.value = ""
})

function editedClose() {
    overlay.classList.add("hidden")
    modal.classList.add("hidden")
}


document.querySelector(".close").addEventListener("click", () => {
    editedClose()
})
document.addEventListener('keyup', (e) => {
    if (e.key == 'Escape') {
        modal.classList.add('hidden')
        overlay.classList.add('hidden')
    }
})

overlay.addEventListener("click", ()=>{
    editedClose()
})


function complated(id) {
    const complatedTodo = todos.map((todo, i) => {
        if (id == i) {
            return { ...todo, complated: todo.complated == true ? false : true }
        } else {
            return { ...todo }
        }
    })
    todos = complatedTodo
    setItem()
    createList()

}

function deletetodo(id) {
    const filterTodo = todos.filter((todo, i) => {
        return id !== i
    })
    todos = filterTodo
    setItem()
    createList()
}