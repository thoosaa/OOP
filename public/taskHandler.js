const addTaskBtn = document.getElementById("add-task-button");

addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let container = document.getElementById("task-display");

    let task = addTaskDisplay(document.getElementById("taskName").value, document.getElementById("taskName").value, document.getElementById("deadline").value, document.getElementById("notification").value,document.getElementById("project").value, document.getElementById("label").value);

    let taskObj = {
        name: document.getElementById("taskName").value, 
        description: document.getElementById("description").value, 
        deadline: document.getElementById("deadline").value,
        notification: document.getElementById("notification").value, 
        priority: document.getElementById("priority").value,
        project: document.getElementById("project").value,
        label: document.getElementById("label").value,
        done: "false",
    }

    container.appendChild(task);

    setCorrectPriority(document.getElementById("priority").value);

    document.getElementById("add-task-widget").style.visibility = "hidden";
    
    if (document.getElementById("deadline").value == new Date().toISOString().slice(0, 10)) {
        incTodayTask();
    }
    incTaskNum();

    sendTaskToDB(taskObj);
});

const navAddButton = document.getElementById("add-task");
navAddButton.addEventListener("click", (e) => {
    addOptionsProject();
    addOptionsLabel();
    document.getElementById("add-task-widget").style.visibility = "visible";
    document.getElementById('deadline').defaultValue = new Date().toISOString().slice(0, 10);
    removeOptionsProject();
    removeOptionsLabel();
});

const closeAddTaskBtn = document.getElementById("close-task-widget");
closeAddTaskBtn.addEventListener("click", (e) => {
    document.getElementById("add-task-widget").style.visibility = "hidden";
    removeOptionsProject();
    removeOptionsLabel();
});

const taskContainer = document.getElementById('task-display');
taskContainer.addEventListener("click", (event) => {
    let btn = event.target.closest('button');
    if (btn) {
        let task = btn.parentElement.parentElement;
        task.parentElement.removeChild(task);

        let Priority;
        if (btn.style.color == "#de4c4a") {
            Priority = "1";
        }
        else if (btn.style.color == "#ffa600") {
            Priority = "2";
        }
        else if (btn.style.color == "#3c00ff") {
            Priority = "3";
        }
        else if (btn.style.color == "#696969") {
            Priority = "4";
        }

        let notif;
        if (task.getElementsByClassName('task-notification')) {
            notif = "";
        }
        else {
            notif = task.getElementsByClassName('task-notification')[0].innerHTML;
        }

        let taskObj = {
            name: task.getElementsByClassName('task-name')[0].innerText,
            description: task.getElementsByClassName('task-des')[0].innerText,
            deadline: task.getElementsByClassName('task-datetime')[0].innerText,
            notification: notif,
            priority: Priority,
            done: "true",
        }
    
        markDoneInDB(taskObj);
    }
    let dv = event.target.closest('div');
    console.log(dv.className);
    if (dv.parentElement.className === 'task') {
        document.getElementById('change-task-widget').style.visibility = 'visible';
    }
})

const closeChangeTask = document.getElementById('close-task-change-widget');
closeChangeTask.addEventListener('click', (e) => {
    document.getElementById('change-task-widget').style.visibility = 'hidden';
});

async function sendTaskToDB(taskObj) {
    const res = await fetch("http://localhost:5000/addTask", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            name: taskObj.name, 
            description: taskObj.description, 
            deadline: taskObj.deadline,
            notification: taskObj.notification, 
            priority: taskObj.priority,
            project: taskObj.project,
            label: taskObj.label,
            done: "false",
        })
    })
}

async function markDoneInDB(taskObj) {
    const res = await fetch("http://localhost:5000/updateTask", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            oldObject: {
                name: taskObj.name,
                description: taskObj.description,
                deadline: taskObj.deadline,
                notification: taskObj.notification,
                priority: taskObj.priority,
                project: taskObj.project,
                done: "false",
            },
            newObject: {
                name: taskObj.name,
                description: taskObj.description,
                deadline: taskObj.deadline,
                notification: taskObj.notification,
                priority: taskObj.priority,
                project: taskObj.project,
                done: "true",
            }
        })
    })
}

export function addTaskDisplay(Name, Description, Deadline, Notification, Project, Label) {
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
  
export function setCorrectPriority(Priority) {
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

export function incTaskNum() {
    let taskCount = parseInt(document.getElementById("icoming-task-number").innerHTML);
    taskCount++;
    document.getElementById("icoming-task-number").innerHTML = taskCount;
}

export function incTodayTask() {
    let taskCount = parseInt(document.getElementById("today-task-number").innerHTML);
    taskCount++;
    document.getElementById("today-task-number").innerHTML = taskCount;
}

function addOptionsProject() {
    let projectOptions = document.getElementById('project');
    let htmlToAdd = projectOptions.innerHTML;
    fetch("http://localhost:5000/getProjects")
    .then((res) => res.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++){
            htmlToAdd += `<option value=${data[i].name}>${data[i].name}</option>`;
        }
        projectOptions.innerHTML = htmlToAdd;
    })
}

function removeOptionsProject() {
    let projectOptions = document.getElementById('project');
    projectOptions.innerHTML = '<option value="inbox">Входящие</option>';
}

function addOptionsLabel() {
    let labelOptions = document.getElementById('label');
    let htmlToAdd = "<option value='nolabel'> </option>";
    fetch("http://localhost:5000/getLabels")
    .then((res) => res.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++){
            htmlToAdd += `<option value=${data[i].name}>${data[i].name}</option>`;
        }
        labelOptions.innerHTML = htmlToAdd;
    })
}

function removeOptionsLabel() {
    let projectOptions = document.getElementById('label');
    projectOptions.innerHTML = '<option value="nolabel"> </option>';
}