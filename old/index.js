const addBtn = document.getElementById("add");
const taskInput = document.querySelector("input.task");
const taskList = document.querySelector(".todo ul");

addBtn.addEventListener("click", () => {
    if (taskInput.value !== "") addTask(taskInput.value);
    taskInput.value = "";
});

function addTask(task) {
    let li = document.createElement("li");
    li.innerHTML = `<span>${task}</span><div><button class="done">Done</button><button class="delete">Delete</button></div>`;
    taskList.appendChild(li);
    let done = li.querySelector("button.done");
    done.addEventListener("click", () => {
        li.style.background = "green";
        done.disabled = true;
    });
    li.querySelector("button.delete").addEventListener("click", () => {
        li.remove();
    });
}
