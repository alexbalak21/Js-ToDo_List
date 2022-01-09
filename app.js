//SELECTORS
const todoInput = document.querySelector(".todoInput");
const todoBtn = document.querySelector(".todoBtn");
const todoList = document.querySelector(".todoList");
const filter = document.querySelector(".options select");
let deleted = "";

//EVENT LISTENTERS

todoBtn.addEventListener("click", addTodo);

function addTodo(event) {
    event.preventDefault();
    if (todoInput.value == "") return null;
    const task = document.createElement("div");
    task.classList.add("todo");
    const li = document.createElement("li");
    const complete = document.createElement("button");
    const del = document.createElement("button");
    complete.classList.add("complete");
    del.classList.add("delete");
    li.innerText = todoInput.value;
    complete.innerHTML = '<i class="fas fa-check"></i>';
    del.innerHTML = '<i class="fas fa-trash"></i>';
    task.append(li, complete, del);
    todoInput.value = "";
    todoList.appendChild(task);
    complete.addEventListener("click", completed);
    del.addEventListener("click", deleteTodo);
}

function deleteTodo(element) {
    const todo = element.target.parentElement;
    deleted = element.target.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => todo.remove());
}

function completed(e) {
    const todo = e.target.parentElement;
    todo.classList.toggle("completed");
}

filter.addEventListener("change", filterTodo);

function filterTodo(e) {
    if (filter.value == "deleted") {
        deleted.classList.remove("fall");
        console.log(deleted);
        todoList.append(deleted);
        filter.value = "all";
    }
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        if (filter.value == "all") todo.style.display = "flex";
        if (filter.value == "completed") {
            if (todo.classList.contains("completed")) todo.style.display = "flex";
            else todo.style.display = "none";
        }
        if (filter.value == "uncompleted") {
            if (todo.classList.contains("completed")) todo.style.display = "none";
            else todo.style.display = "flex";
        }
    });
}
