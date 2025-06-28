// Get DOM elements
var taskInput = document.getElementById('task-input');
var addTaskBtn = document.getElementById('add-task-btn');
var taskList = document.getElementById('task-list');

var tasks = [];
var editIndex = null;
var funEmojis = ['🎉', '✅', '🌟', '😎', '🔥', '✨', '🥳', '👍', '🦄', '🍀', '💡', '🎈'];

// Load tasks from localStorage
function loadTasks() {
    var storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    } else {
        tasks = [];
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the UI
function renderTasks() {
    taskList.innerHTML = '';
    for (var i = 0; i < tasks.length; i++) {
        var taskObj = tasks[i];
        var task, completed;
        if (typeof taskObj === 'string') {
            task = taskObj;
            completed = false;
        } else {
            task = taskObj.text;
            completed = taskObj.completed;
        }
        var li = document.createElement('li');
        li.className = 'task-item';

        if (editIndex === i) {
            var editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = task;
            editInput.className = 'edit-input';
            li.appendChild(editInput);

            var saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.className = 'save-btn';
            saveBtn.onclick = (function(index, editInput, completed) {
                return function() {
                    var newValue = editInput.value.replace(/^\s+|\s+$/g, '');
                    if (newValue) {
                        tasks[index] = { text: newValue, completed: completed };
                        editIndex = null;
                        saveTasks();
                        renderTasks();
                    }
                };
            })(i, editInput, completed);
            li.appendChild(saveBtn);

            var cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.className = 'cancel-btn';
            cancelBtn.onclick = function() {
                editIndex = null;
                renderTasks();
            };
            li.appendChild(cancelBtn);
        } else {
            var span = document.createElement('span');
            span.textContent = task;
            if (completed) {
                span.className = 'completed';
            }
            li.appendChild(span);

            var doneBtn = document.createElement('button');
            doneBtn.textContent = completed ? 'Undo' : 'Done';
            doneBtn.className = 'done-btn';
            doneBtn.onclick = (function(index, task, completed) {
                return function() {
                    tasks[index] = { text: task, completed: !completed };
                    saveTasks();
                    renderTasks();
                };
            })(i, task, completed);
            li.appendChild(doneBtn);

            var editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            editBtn.onclick = (function(index) {
                return function() {
                    editIndex = index;
                    renderTasks();
                };
            })(i);
            li.appendChild(editBtn);

            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = (function(index) {
                return function() {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                };
            })(i);
            li.appendChild(deleteBtn);
        }
        taskList.appendChild(li);
    }
}

// Show fun emoji when adding a task
function showEmoji() {
    var emoji = funEmojis[Math.floor(Math.random() * funEmojis.length)];
    var emojiSpan = document.createElement('span');
    emojiSpan.textContent = emoji;
    emojiSpan.className = 'emoji-bounce';
    var h1 = document.getElementsByTagName('h1')[0];
    h1.insertBefore(emojiSpan, h1.firstChild);
    setTimeout(function() {
        emojiSpan.parentNode.removeChild(emojiSpan);
    }, 1200);
}

// Add task event
addTaskBtn.onclick = function() {
    var task = taskInput.value.replace(/^\s+|\s+$/g, '');
    if (task) {
        tasks.push({ text: task, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
        showEmoji();
    }
};

taskInput.onkeydown = function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        addTaskBtn.onclick();
    }
};

// Initial load
loadTasks();
renderTasks();
