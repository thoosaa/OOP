import * as taskHandler from './taskHandler.js';

window.addEventListener("load", (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/getTasks")
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++){
                console.log(data[i]);

                let container = document.getElementById("task-display");

                if (data[i].done == "false") {
                    let task = taskHandler.addTaskDisplay(data[i].name, data[i].description, data[i].deadline, data[i].notification, data[i].project, data[i].label);
                    container.appendChild(task);
                    taskHandler.setCorrectPriority(data[i].priority);
                    if (data[i].deadline == new Date().toISOString().slice(0, 10)) {
                        taskHandler.incTodayTask();
                    }
                    taskHandler.incTaskNum();
                }
            }
        });
});