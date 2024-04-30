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