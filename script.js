// ------------------ Fortune Generator ------------------
const fortunes = [
    "Good things are coming your way!",
    "Believe in yourself and all that you are.",
    "A new opportunity will present itself soon.",
    "Happiness is found in the little things.",
    "Trust the process and keep moving forward.",
    "Your kindness will bring great rewards.",
    "Challenges are opportunities in disguise.",
    "Success comes to those who work for it.",
    "Embrace change and growth.",
    "Today is a fresh start."
];

// Show random fortune on page load
document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("fortuneBox");
    if (box) {
        box.innerText = getRandomFortune();
    }

    // Load tasks if To-Do exists
    loadTasks();
});

function getRandomFortune() {
    return fortunes[Math.floor(Math.random() * fortunes.length)];
}

// ------------------ Styling Functions ------------------
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function changeTextColor() {
    const box = document.getElementById("fortuneBox");
    if (box) box.style.color = getRandomColor();
}

function changeBgColor() {
    const box = document.getElementById("fortuneBox");
    if (box) box.style.backgroundColor = getRandomColor();
}

function changeBorderColor() {
    const box = document.getElementById("fortuneBox");
    if (box) box.style.borderColor = getRandomColor();
}

function changeFontSize() {
    const sizes = ["18px", "22px", "26px", "30px"];
    const fonts = ["Arial", "Verdana", "Georgia", "Times New Roman"];
    const box = document.getElementById("fortuneBox");
    if (box) {
        box.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
        box.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
    }
}

// ------------------ Stopwatch Timer ------------------
let time = 0;
let interval = null;

function startTimer() {
    if (!interval && time < 30) {
        interval = setInterval(() => {
            if (time < 30) {
                time += 3;
                updateTimerDisplay();
            } else {
                clearInterval(interval);
                interval = null;
            }
        }, 3000);
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    time = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const display = document.getElementById("display");
    if (display) display.innerText = time + "s";
}

// ------------------ To-Do List ------------------
let tasks = [];

function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }

    const addButton = document.getElementById("addButton");
    const taskInput = document.getElementById("taskInput");

    if (addButton && taskInput) {
        addButton.addEventListener("click", addTask);
        taskInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") addTask();
        });
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text === "") return;

    tasks.push({
        id: Date.now().toString(),
        text,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    if (!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompleted(task.id));

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;
        if (task.completed) span.classList.add("completed");

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function toggleTaskCompleted(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}
