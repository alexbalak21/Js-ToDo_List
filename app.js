//SERVER CONNECTION
import Connection from "./Requests.js";
const conn = new Connection();

//SELECTORS
const todoInput = document.querySelector(".todoInput");
const todoBtn = document.querySelector(".todoBtn");
const todoList = document.querySelector(".todoList");
const filter = document.querySelector(".options select");

//EVENT LISTENTERS
document.onload = updateTasks();
filter.addEventListener("change", filterTodo);

// displayTasks();
todoBtn.addEventListener("click", addTodo);

//GET ALL TASKS
async function updateTasks() {
    const tasks = await conn.getAll(); //GET ALL TASKS FOROM DB Using Connection Class
    tasks.forEach((task) => {
        //FOR EACH TASK ask function to Display Task
        displayTask(task);
    });
}

//DIPLAY TASK BY TASK
function displayTask(taskData) {
    //CREATE ALL HTML ELEMENTS END FILL THEM
    const task = document.createElement("div");
    task.classList.add("todo");
    if (taskData.completed) task.classList.add("completed"); //CHEKS IF TASK IS COMPLETED
    const li = document.createElement("li");
    const complete = document.createElement("button");
    const del = document.createElement("button");
    complete.classList.add("complete");
    del.classList.add("delete");
    complete.innerHTML = '<i class="fas fa-check"></i>';
    del.innerHTML = '<i class="fas fa-trash"></i>';
    li.innerText = taskData.taskName;
    task.append(li, complete, del);
    //ADD TASK TO TASK LIST
    todoList.appendChild(task);

    //UPDATE TASK TO COMPLETE/UNCOMPLETE
    complete.addEventListener("click", async () => {
        await conn.patchOne(taskData._id);
        task.classList.toggle("completed");
    });
    //DELETE TASK
    del.addEventListener("click", async () => {
        await conn.deleteOne(taskData._id); //DELETE TASK FORM DB
        task.classList.add("fall"); //FALL ANIMATION ADD
        task.addEventListener("transitionend", () => task.remove()); //DELETE TASK FORM DISPLAY
    });
}

//ADD TODO
async function addTodo(event) {
    event.preventDefault();
    if (todoInput.value == "") return null;
    let input = todoInput.value;
    let added = await conn.addOne(input);
    displayTask(added);
    todoInput.value = "";
}

//FILTER BY COMPLETED or UNCOMPLETED
function filterTodo(e) {
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
