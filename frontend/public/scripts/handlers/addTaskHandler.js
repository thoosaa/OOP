import taskDisplay from "../classes/taskDisplay.js";
import tokenUsername from "../classes/tokenUsername.js";

const addTaskNavBtn = document.getElementById('add-task');
const addTaskBtn = document.getElementById('add-task-button')

const closeModal = document.getElementById('close-add-task');

const addTaskModal = document.getElementById('add-task-modal');

addTaskNavBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTaskModal.showModal();
})

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    addTaskModal.close();
})

addTaskBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById("add-task-form"));

    let taskObj = {};
    formData.forEach((value, key) => {
        taskObj[key] = value;
    });

    taskObj['done'] = 'false';

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.value.trim()) {
            switch (input.id) {
                case "description":
                    taskObj['description'] = "";
                    break;
                case "notification":
                    taskObj['notification'] = "";
                    break;
                case "deadline":
                    taskObj['deadline'] = "";
                    break;
            }
        }
    });

    if (document.getElementById('label').value.trim() == "") {
        taskObj['label'] = "nolabel";
    }

    console.log("OHRANA OTMENA", document.getElementById('label').value.trim() == "");
    
    taskObj = correctObj(taskObj);
    console.log(taskObj);

    try {
        const response = await fetch(`http://localhost:5000/task/add?username=${tokenUsername.getUsername()}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(taskObj)
        });

        if (response.ok) {
            taskDisplay.correctPageDisplay(document.getElementById('page-name').innerText);
            addTaskModal.close();
        } else {
            console.error('Ошибка при выполнении запроса');
        }


    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
})

function correctObj(taskObj) {
    const orderedKeys = ['name', 'description', 'deadline', 'notification', 'priority', 'project', 'label', 'done'];
    const orderedTaskObj = {};
    orderedKeys.forEach(key => {
        if (taskObj.hasOwnProperty(key)) {
            orderedTaskObj[key] = taskObj[key];
        }
    });
    return orderedTaskObj;
}