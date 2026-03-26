let tasks = [];

// Load saved tasks when page loads
window.onload = function () {
    let saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);

        tasks.forEach(function(taskObj) {
            createTask(taskObj);
        });
    }
};

// Add new task
function addTask() {
    let taskInput = document.getElementById("task");
    let task = taskInput.value;

    if (task) {
        let taskObj = {
            text: task,
            done: false
        };

        tasks.push(taskObj);
        createTask(taskObj);
        saveTasks();

        taskInput.value = "";
    }
}

// Create UI for each task
function createTask(taskObj) {
    let li = document.createElement("li");

    let box = document.createElement("input");
    box.type = "checkbox";
    box.checked = taskObj.done;

    let span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskObj.text;

    // Apply strike-through if already completed
    if (taskObj.done) {
        span.style.textDecoration = "line-through";
    }

    // Checkbox event
    box.addEventListener("change", function () {
        taskObj.done = this.checked;

        if (this.checked) {
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }

        saveTasks();
    });

    // Delete button
    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = function () {
        li.remove();

        // remove from array
        tasks = tasks.filter(t => t !== taskObj);

        saveTasks();
    };

    li.appendChild(box);
    li.appendChild(span);
    li.appendChild(btn);

    document.getElementById("list").appendChild(li);
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}