import * as taskHandler from './taskHandler.js';


window.addEventListener("load", (event) => {
    fetch("http://localhost:5000/getTasks")
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++){
                console.log(data[i]);

                let container = document.getElementById("task-display");

                if (data[i].done == "false") {
                    taskHandler.incTaskNum();
                    if (data[i].deadline == new Date().toISOString().slice(0, 10)) {
                        let task = taskHandler.addTaskDisplay(data[i].name, data[i].description, data[i].deadline, data[i].notification, data[i].project);
                        container.appendChild(task);
                        taskHandler.setCorrectPriority(data[i].priority);
                        taskHandler.incTodayTask();
                    }
                }
            }
        });
});