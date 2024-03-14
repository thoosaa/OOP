import * as TD from './TaskDisplay.js';
import * as DB from './DataBase.js';

window.addEventListener('load', (event) => {
    event.preventDefault();
    TD.default.correctPageDisplay(document.getElementById('page-name').innerText);
});

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
    DB.default.addTask(taskObj);
    document.getElementById('add-task-widget').style.visibility = 'hidden';
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
        DB.default.updateTask(oldObj, taskObj);

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
    console.log("oldobj",oldObject);
    console.log("taskObj",taskObj);

    DB.default.updateTask(oldObject, taskObj);
    document.getElementById('change-task-widget').style.visibility = 'hidden';
    removeOptionsProject('newProject');
    removeOptionsLabel('newLabel');
    clearOldTask();
    
    TD.default.correctPageDisplay(document.getElementById('page-name').innerText);
    
});

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

function clearOldTask(){
    oldObject.name = "";
    oldObject.description = "";
    oldObject.deadline = "";
    oldObject.notification = "";
    oldObject.priority = "";
    oldObject.project= "";
    oldObject.label = "";
    oldObject.done = "false";
}