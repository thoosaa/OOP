import * as task from './taskHandler.js';

const urlParams = new URLSearchParams(window.location.search);
const currProjectName = urlParams.get('currProjectName');

document.getElementById('page-name').innerHTML = currProjectName;

window.addEventListener('load', (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/getWithProject", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            currProjectName
        })
    }).then((res) => res.json()).then((res) => {
        let arr = res[0].tasks;
        let container = document.getElementById("task-display");
        for (let i = 0; i < arr.length; i++){
            if (arr[i].project == currProjectName) {
                let prTask = task.addTaskDisplay(arr[i].name, arr[i].description, arr[i].deadline, arr[i].notification, arr[i].project, arr[i].label);
                container.appendChild(prTask);
                task.setCorrectPriority(arr[i].priority);
            }
        }
    });
    
    
});