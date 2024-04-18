import tokenUsername from "../classes/tokenUsername.js";
import inboxDisplay from "./inboxDisplay.js";

export class TaskDisplay {
    #container = document.getElementById("task-display");

    async correctPageDisplay(pageName) {
        const urlParams = new URLSearchParams(window.location.search);
        const currProjectName = urlParams.get("currProjectName");
        if (currProjectName) {
            document.getElementById("page-name").innerHTML = currProjectName;
            pageName = "project";
        }
        const currLabelName = urlParams.get("currLabelName");
        if (currLabelName) {
            document.getElementById("page-name").innerHTML = currLabelName;
            pageName = "label";
        }

        switch (pageName) {
            case "Входящие":
                document.getElementById("task-display").innerHTML = "";
                document.getElementById("date-display").innerHTML = "";
                await this.#displayAll();
                break;
            case "Сегодня":
                document.getElementById("task-display").innerHTML = "";
                await this.#displayToday();
                break;
            case "Выполненные задачи":
                await this.#displayDone();
                break;
            case "project":
                this.#displayProject(currProjectName);
                break;
            case "label":
                this.#displayLabel(currLabelName);
                break;
        }
    }

    async #displayAll() {
        const res = await fetch(
            `http://localhost:5000/task/get?username=${tokenUsername.getUsername()}`
        );
        const tasks = await res.json();
        if (tasks.length == 0) {
            this.#emptyScreen();
            return;
        }
        const columns = inboxDisplay.createDates();
        tasks.forEach((task) => {
            columns.forEach((column) => {
                const columnDate = new Date(
                    column.querySelector(".date").innerText
                );

                columnDate.setDate(columnDate.getDate() + 1);
                //console.log(columnDate);

                if (task.deadline === columnDate.toISOString().slice(0, 10)) {
                    const taskElement = this.#addTaskToPage(task);
                    column.appendChild(taskElement);
                    this.#setCorrectPriority(task.priority);
                }
            });
        });
    }

    async #displayToday() {
        const res = await fetch(
            `http://localhost:5000/task/getToday?username=${tokenUsername.getUsername()}`
        );
        const tasks = await res.json();
        if (tasks.length == 0) {
            this.#emptyScreen();
        }

        tasks.forEach((task) => {
            console.log(task);
            const taskElement = this.#addTaskToPage(task);
            console.log(taskElement);
            this.#container.appendChild(taskElement);
            this.#setCorrectPriority(task.priority);
        });
    }

    async #displayDone() {
        const res = await fetch(
            `http://localhost:5000/task/getDone?username=${tokenUsername.getUsername()}`
        );
        const tasks = await res.json();
        console.log(tasks);
        if (tasks.length == 0) {
            this.#emptyScreen();
        }
        tasks.forEach((task) => {
            const taskElement = this.#addTaskToPage(task);
            this.#container.appendChild(taskElement);
            this.#setCorrectPriority(task.priority);
        });
    }

    #displayProject(projectName) {
        fetch(
            `http://localhost:5000/task/getProject?username=${tokenUsername.getUsername()}&projectName=${projectName}`
        )
            .then((res) => res.json())
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    this.#addTaskToPage(res[i]);
                }
            });
    }

    #displayLabel(labelName) {
        fetch("http://localhost:5000/getWithLabel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                labelName,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res[0] != undefined) {
                    console.log(res[0].tasks);
                    for (let i = 0; i < res[0].tasks.length; i++) {
                        if (res[0].tasks[i].label === labelName) {
                            this.#addTaskToPage(res[0].tasks[i]);
                            //correct task num and today task num
                        }
                    }
                } else {
                    this.#emptyScreen();
                }
            });
    }

    #setCorrectPriority(Priority) {
        const buttons = document.getElementsByClassName("task-button");
        const button = buttons[buttons.length - 1];

        let bg_color, color;

        switch (Priority) {
            case "1":
                bg_color = "rgba(222, 76, 74, 0.1)";
                color = "#de4c4a";
                break;
            case "2":
                bg_color = "rgba(255, 166, 0, 0.1)";
                color = "#ffa600";
                break;
            case "3":
                bg_color = "rgba(60, 0, 255, 0.1)";
                color = "#3c00ff";
                break;
            case "4":
                bg_color = "rgba(105, 105, 105, 0.1)";
                color = "#696969";
                break;
        }

        button.style.color = color;
        button.style.borderColor = color;
        button.style.backgroundColor = bg_color;
    }

    #addTaskDisplay(Name, Description, Deadline, Notification, Project, Label) {
        let task = document.createElement("div");

        task.className = "task";

        let htmlToAdd = `
        <div>
            <button class="task-button">
                <span class="material-symbols-outlined task-check">
                    done
                    </span>
                </button>
            </div>
            <div class="task-in">
                <p class="task-name">${Name}</p>
                <p class="task-des">${Description}</p>
                <div class="task-params">
                    <span class="material-symbols-outlined">
                        event_upcoming
                    </span>
                    <span class="task-datetime">${Deadline}</span>`;

        if (Notification != "") {
            htmlToAdd += `<span class="material-symbols-outlined task-notification">
            alarm
            </span>
            <span class="task-notification">${Notification}</span>`;
        }

        if (Project !== "inbox") {
            htmlToAdd += `<span class="material-symbols-outlined task-project">
                tag
            </span>
            <span class="task-project">${Project}</span>`;
        }

        if (Label !== "nolabel") {
            htmlToAdd += `<span class="material-symbols-outlined task-label">
                label
            </span>
            <span class="task-label">${Label}</span>`;
        }

        htmlToAdd += `</div> </div>`;

        task.innerHTML = htmlToAdd;

        return task;
    }

    #addTaskToPage(taskObj) {
        let task = this.#addTaskDisplay(
            taskObj.name,
            taskObj.description,
            taskObj.deadline,
            taskObj.notification,
            taskObj.project,
            taskObj.label
        );
        //this.#container.appendChild(task);
        //this.#setCorrectPriority(taskObj.priority);

        return task;
    }

    #emptyScreen() {
        document.getElementById(
            "task-display"
        ).innerHTML = `<div class="task-empty"><img src="https://preview.redd.it/7gr4xbmxp0s91.jpg?auto=webp&s=af151dc8095d78be58e44c18bf72d103f34d9958"></div>`;
    }
}

export default new TaskDisplay();
