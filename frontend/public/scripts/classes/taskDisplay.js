import tokenUsername from "../classes/tokenUsername.js";
import inboxDisplay from "./inboxDisplay.js";
import tickHandler from "../handlers/tickHandler.js";
import projectMethods from "./projectMethods.js";
import labelMethods from "./labelMethods.js";
import countTask from "./countTask.js";

export class TaskDisplay {
    #container = document.getElementById("task-display");
    #projectDict;
    #labelDict;

    constructor() {
        document.addEventListener("DOMContentLoaded", async () => {
            this.#projectDict = await projectMethods.formProjectDict();
            this.#labelDict = await labelMethods.formLabelDict();
        });
    }

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

        const taskDisplay = document.getElementById("task-display");
        const dateDisplay = document.getElementById("date-display");

        if (taskDisplay) {
            taskDisplay.innerHTML = null;
        }

        if (dateDisplay) {
            dateDisplay.innerHTML = null;
        }

        switch (pageName) {
            case "Входящие":
                await this.#displayAll();
                break;
            case "Сегодня":
                await this.#displayToday();
                break;
            case "Просроченные":
                await this.#displayMissed();
                break;
            case "Выполненные задачи":
                await this.#displayDone();
                break;
            case "project":
                this.#displayProject(currProjectName);
                break;
            case "label":
                await this.#displayLabel(currLabelName);
                break;
        }

        if (pageName !== "Выполненные задачи") {
            tickHandler();
        }
    }

    async #displayAll() {
        const res = await fetch(
            `http://localhost:5000/task/get?username=${tokenUsername.getUsername()}`
        );
        const tasks = await res.json();
        const countmissed = await countTask.getMissed();
        if (tasks.length == 0 || tasks.length - countmissed <= 0) {
            this.#emptyScreen();
            return;
        }
        const columns = inboxDisplay.createDates();
        tasks.forEach((task) => {
            console.log(task);
            console.log(task.notification);
            columns.forEach((column) => {
                const columnDate = new Date(
                    column.querySelector(".date").innerText
                );

                columnDate.setDate(columnDate.getDate() + 1);

                if (task.deadline === columnDate.toISOString().slice(0, 10)) {
                    const taskElement = this.#addTaskToPage(task);
                    column.appendChild(taskElement);
                    this.#setColors(task, taskElement);
                }
            });
        });
    }

    async #displayMissed() {
        const res = await fetch(
            `http://localhost:5000/task/getMissed?username=${tokenUsername.getUsername()}`
        );
        const tasks = await res.json();
        if (tasks.length == 0) {
            this.#emptyScreen();
        }

        tasks.forEach((task) => {
            console.log(task);
            console.log(task.notification);
            const taskElement = this.#addTaskToPage(task);
            console.log(taskElement);
            this.#container.appendChild(taskElement);
            this.#setColors(task, taskElement);
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
            this.#setColors(task, taskElement);
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
            this.#setColors(task, taskElement);
        });
    }

    async #displayProject(projectName) {
        const res = await fetch(
            `http://localhost:5000/task/getProject?username=${tokenUsername.getUsername()}&projectName=${projectName}`
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
            this.#setColors(task, taskElement);
        });
    }

    async #displayLabel(labelName) {
        const res = await fetch(
            `http://localhost:5000/task/getLabel?username=${tokenUsername.getUsername()}&labelName=${labelName}`
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
        });
    }

    #setCorrectProjectColor(Project, button) {
        button.style.color = this.#projectDict[Project];
    }

    #setCorrectLabelColor(Label, button) {
        button.style.color = this.#labelDict[Label];
    }

    #setCorrectPriority(Priority, button) {
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

    #setColors(task, taskElement) {
        this.#setCorrectPriority(
            task.priority,
            taskElement.querySelector(".task-button")
        );

        if (taskElement.querySelector(".task-project")) {
            this.#setCorrectProjectColor(
                task.project,
                taskElement.querySelector(".task-params .task-project")
            );
        }

        if (taskElement.querySelector(".task-label")) {
            this.#setCorrectProjectColor(
                task.project,
                taskElement.querySelector(".task-params .task-label")
            );
        }
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
