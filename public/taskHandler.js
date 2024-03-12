let oldObject = {
    name: "", 
    description: "", 
    deadline: "",
    notification: "", 
    priority: "",
    project: "",
    label: "",
    done: "false",
}

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
    e.preventDefault();
    addOptionsProject('project');
    addOptionsLabel('label');
    document.getElementById("add-task-widget").style.visibility = "visible";
    document.getElementById('deadline').defaultValue = new Date().toISOString().slice(0, 10);
    removeOptionsProject('project');
    removeOptionsLabel('label');
});

const closeAddTaskBtn = document.getElementById("close-task-widget");
closeAddTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("add-task-widget").style.visibility = "hidden";
    removeOptionsProject('project');
    removeOptionsLabel('label');
});

const taskContainer = document.getElementById('task-display');
taskContainer.addEventListener("click", (event) => {
    event.preventDefault();
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

        let label;
        if (task.getElementsByClassName('task-label')) {
            label = "";
        }
        else {
            label = task.getElementsByClassName('task-label')[1].innerHTML;
        }

        let project;
        if (task.getElementsByClassName('task-project')) {
            project = "";
        }
        else {
            project = task.getElementsByClassName('task-project')[1].innerHTML;
        }

        let taskObj = {
            name: task.getElementsByClassName('task-name')[0].innerText,
            description: task.getElementsByClassName('task-des')[0].innerText,
            deadline: task.getElementsByClassName('task-datetime')[0].innerText,
            notification: notif,
            priority: Priority,
            project: project,
            label: label,
            done: "true",
        }
        
        let oldObj = Object.assign({}, taskObj);
        oldObj.done = "false";
        updateTaskInDB(oldObj, taskObj);

        if (taskObj.deadline == new Date().toISOString().slice(0, 10)) {
            decTodayTask();
        }
        decTaskNum();
        return;
    }

    let dv = event.target.closest('div');
    console.log(dv.className);
    if (dv.parentElement.className === 'task' || dv.className === 'task') {
        let widget = document.getElementById('change-task-widget');

        addOptionsProject('newProject');
        addOptionsLabel('newLabel');

        document.getElementById('newTaskName').value = dv.parentElement.getElementsByClassName('task-name')[0].innerText;
        oldObject.name = dv.parentElement.getElementsByClassName('task-name')[0].innerText;

        document.getElementById('newDescription').value = dv.parentElement.getElementsByClassName('task-des')[0].innerText;
        oldObject.description = dv.parentElement.getElementsByClassName('task-des')[0].innerText;

        document.getElementById('newDeadline').value = dv.parentElement.getElementsByClassName('task-datetime')[0].innerText;
        oldObject.deadline = dv.parentElement.getElementsByClassName('task-datetime')[0].innerText;

        if (dv.parentElement.getElementsByClassName('task-notification').length !== 0) {
            //console.log(dv.parentElement.getElementsByClassName('task-notification'));
            document.getElementById('newNotification').value = dv.parentElement.getElementsByClassName('task-notification')[1].innerText;
            oldObject.notification = dv.parentElement.getElementsByClassName('task-notification')[1].innerText;
        }
        if (dv.parentElement.getElementsByClassName('task-priority').length !== 0) {
            //document.getElementById('newPriority').defaultValue = dv.parentElement.getElementsByClassName('task-priority')[0].innerText;
            oldObject.priority = getPriority(dv.parentElement.getElementsByClassName('task-check')[0].style.color);
        }
        if (dv.parentElement.getElementsByClassName('task-label').length !== 0) {
            document.getElementById('newLabel').value = dv.parentElement.getElementsByClassName('task-label')[1].innerText;
            oldObject.label = dv.parentElement.getElementsByClassName('task-label')[1].innerText;
        }

        widget.style.visibility = 'visible';
    }
})

const closeChangeTask = document.getElementById('close-task-change-widget');
closeChangeTask.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('change-task-widget').style.visibility = 'hidden';
    removeOptionsProject('newProject');
    removeOptionsLabel('newLabel');
});

const changeTask = document.getElementById('change-task-button');
changeTask.addEventListener('click', (e) => {
    e.preventDefault();
    let taskObj = {
        name: document.getElementById("newTaskName").value, 
        description: document.getElementById("newDescription").value, 
        deadline: document.getElementById("newDeadline").value,
        notification: document.getElementById("newNotification").value, 
        priority: document.getElementById("newPriority").value,
        project: document.getElementById("newProject").value,
        label: document.getElementById("newLabel").value,
        done: "false",
    }
    console.log(oldObject);

    updateTaskInDB(oldObject, taskObj);
    document.getElementById('change-task-widget').style.visibility = 'hidden';
    removeOptionsProject('newProject');
    removeOptionsLabel('newLabel');

    if (document.getElementById('page-name').innerText == 'Входящие') {
        document.getElementById('task-display').innerHTML = "";
        displayAllTasks();
    }
    else if (document.getElementById('page-name').innerText == 'Сегодня') {
        document.getElementById('task-display').innerHTML = "";
        displayTodayTasks();
    }
});

async function sendTaskToDB(taskObj) {
    await fetch("http://localhost:5000/addTask", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            taskObj
        })
    })
}

async function updateTaskInDB(oldObject, newObject) {
    await fetch("http://localhost:5000/updateTask", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            oldObject,
            newObject
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

export function decTaskNum() {
    let taskCount = parseInt(document.getElementById("icoming-task-number").innerHTML);
    taskCount--;
    document.getElementById("icoming-task-number").innerHTML = taskCount;
}

export function decTodayTask() {
    let taskCount = parseInt(document.getElementById("today-task-number").innerHTML);
    taskCount--;
    document.getElementById("today-task-number").innerHTML = taskCount;
}

function addOptionsProject(id) {
    let projectOptions = document.getElementById(id);
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

function removeOptionsProject(id) {
    let projectOptions = document.getElementById(id);
    projectOptions.innerHTML = '<option value="inbox">Входящие</option>';
}

function addOptionsLabel(id) {
    let labelOptions = document.getElementById(id);
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

function removeOptionsLabel(id) {
    let projectOptions = document.getElementById(id);
    projectOptions.innerHTML = '<option value="nolabel"> </option>';
}

function getPriority(color) {
    if (color === "#de4c4a") return 1;
    else if (color === "#ffa600") return 2;
    else if (color === "#3c00ff") return 3;
    else return 4;
}

function displayAllTasks() {
    fetch("http://localhost:5000/getTasks")
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++){
                console.log(data[i]);

                let container = document.getElementById("task-display");

                if (data[i].done == "false") {
                    let task = addTaskDisplay(data[i].name, data[i].description, data[i].deadline, data[i].notification, data[i].project, data[i].label);
                    container.appendChild(task);
                    setCorrectPriority(data[i].priority);
                    if (data[i].deadline == new Date().toISOString().slice(0, 10)) {
                        incTodayTask();
                    }
                    incTaskNum();
                }
            }
        });
}

function displayTodayTasks() {
    fetch("http://localhost:5000/getTasks")
    .then((res) => res.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++){
            console.log(data[i]);

            let container = document.getElementById("task-display");

            if (data[i].done == "false") {
                incTaskNum();
                if (data[i].deadline == new Date().toISOString().slice(0, 10)) {
                    let task = addTaskDisplay(data[i].name, data[i].description, data[i].deadline, data[i].notification, data[i].project, data[i].label);
                    container.appendChild(task);
                    setCorrectPriority(data[i].priority);
                    incTodayTask();
                }
            }
        }
    });
}