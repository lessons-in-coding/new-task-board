let taskIdCounter = 0; // Initialize a counter for generating unique IDs

// Check if there are tasks saved in local storage and load them
window.onload = function () {
  if (localStorage.getItem("tasks")) {
    document.getElementById("todo-column").innerHTML =
      localStorage.getItem("tasks");
    taskIdCounter = document.querySelectorAll(".task").length;
    // Restore task content from local storage
    restoreTaskContent();
  }
  if (localStorage.getItem("inProgressTasks")) {
    document.getElementById("inprogress-column").innerHTML =
      localStorage.getItem("inProgressTasks");
    // Restore task content from local storage
    restoreTaskContent();
  }
  if (localStorage.getItem("doneTasks")) {
    document.getElementById("done-column").innerHTML =
      localStorage.getItem("doneTasks");
    // Restore task content from local storage
    restoreTaskContent();
  }
  // Add event listeners after loading tasks
  addEventListenersToTasks();
};

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var targetColumn = event.target.closest(".column");
  var task = document.getElementById(data);
  var taskData = task.getAttribute("data-task");

  if (targetColumn.id !== task.parentNode.id) {
    task.parentNode.removeChild(task);
    event.target.appendChild(task);
    alert("Moved task '" + taskData + "' to " + targetColumn.id);
    saveTasks(); // Save tasks to local storage after moving
  }
}

function dropTrash(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var task = document.getElementById(data);
  var taskData = task.getAttribute("data-task");

  task.parentNode.removeChild(task);
  alert("Deleted task '" + taskData + "'");
  saveTasks(); // Save tasks to local storage after deleting
}

function addTask() {
  // Increment the counter to generate a new unique ID
  taskIdCounter++;

  var newTask = document.createElement("div");
  newTask.className = "task";
  newTask.setAttribute("draggable", "true");
  newTask.setAttribute("contenteditable", "true");
  newTask.setAttribute("id", "task" + taskIdCounter); // Assign a unique ID
  newTask.innerHTML = ""; // Set innerHTML to an empty string
  newTask.addEventListener("dragstart", drag);
  newTask.addEventListener("focus", clearPlaceholder); // Add focus event listener
  newTask.addEventListener("input", saveTaskContent); // Add input event listener to save content
  document.getElementById("todo-column").appendChild(newTask);
  saveTasks(); // Save tasks to local storage after adding
  addEventListenersToTask(newTask); // Add event listener to the new task
}

function saveTasks() {
  localStorage.setItem(
    "tasks",
    document.getElementById("todo-column").innerHTML
  );
  localStorage.setItem(
    "inProgressTasks",
    document.getElementById("inprogress-column").innerHTML
  );
  localStorage.setItem(
    "doneTasks",
    document.getElementById("done-column").innerHTML
  );
}

function restoreTaskContent() {
  // Restore task content from local storage
  var tasks = document.querySelectorAll(".task");
  tasks.forEach(function (task) {
    var taskId = task.getAttribute("id");
    var taskContent = localStorage.getItem(taskId + "_content");
    if (taskContent !== null) {
      task.innerText = taskContent;
    }
  });
}

function addEventListenersToTasks() {
  var tasks = document.querySelectorAll(".task");
  tasks.forEach(function (task) {
    addEventListenersToTask(task);
  });
}

function addEventListenersToTask(task) {
  task.addEventListener("dragstart", drag);
  task.addEventListener("focus", clearPlaceholder); // Add focus event listener
  task.addEventListener("input", saveTaskContent); // Add input event listener to save content
}

function saveTaskContent(event) {
  var task = event.target;
  var taskId = task.getAttribute("id");
  var taskContent = task.innerText.trim(); // Trim leading and trailing whitespace
  // Save task content only if it's not empty
  if (taskContent !== "") {
    localStorage.setItem(taskId + "_content", taskContent);
  } else {
    // If content is empty, remove it from local storage
    localStorage.removeItem(taskId + "_content");
  }
}

function clearPlaceholder(event) {
  var task = event.target;
  if (task.innerText === "New Task") {
    task.innerText = "";
  }
}

/* ==================================== */

/*
//First time try
let taskIdCounter = 2; // Initialize a counter for generating unique IDs

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var targetColumn = event.target.closest(".column");
  var task = document.getElementById(data);
  var taskData = task.getAttribute("data-task");

  if (targetColumn.id !== task.parentNode.id) {
    task.parentNode.removeChild(task);
    event.target.appendChild(task);
    alert("Moved task '" + taskData + "' to " + targetColumn.id);
  }
}

function dropTrash(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var task = document.getElementById(data);
  var taskData = task.getAttribute("data-task");

  task.parentNode.removeChild(task);
  alert("Deleted task '" + taskData + "'");
}

function addTask() {
  // Increment the counter to generate a new unique ID
  taskIdCounter++;

  var newTask = document.createElement("div");
  newTask.className = "task";
  newTask.setAttribute("draggable", "true");
  newTask.setAttribute("contenteditable", "true");
  newTask.setAttribute("id", "task" + taskIdCounter); // Assign a unique ID
  newTask.innerHTML = "New Task";
  newTask.addEventListener("dragstart", drag);
  document.getElementById("todo-column").appendChild(newTask);
}
*/
