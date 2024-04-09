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

    const taskObj = {};
    formData.forEach((value, key) => {
        taskObj[key] = value;
    });
    taskObj['done'] = 'false';

    fetch(`http://localhost:5000/task/add?username=${tokenUsername.getUsername()}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(taskObj)
    }).then((res) => {
        console.log("KLHKHKKKKkk");
        taskDisplay.correctPageDisplay(document.getElementById('page-name').innerText);
    });

    addTaskModal.close();
})