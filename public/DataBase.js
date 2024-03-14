import * as TD from './TaskDisplay.js';

export class DataBase{
    addTask(taskObj) {
        fetch("http://localhost:5000/addTask", {
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
                done: "false"
            })
        }).then((res) => {
            TD.default.correctPageDisplay(document.getElementById('page-name').innerText);
        });
    }

    updateTask(oldObject, newObject) {
        fetch("http://localhost:5000/updateTask", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                oldObject,
                newObject
            })
        }).then((res) => {
            TD.default.correctPageDisplay(document.getElementById('page-name').innerText);
        });
    }

    addLabel(labelObj) {
        fetch("http://localhost:5000/addLabel", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            name: labelObj.name, 
            color: labelObj.color
        })
    })
    }
}

export default new DataBase();