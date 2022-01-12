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
