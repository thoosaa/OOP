import taskDisplay from "../classes/taskDisplay.js";
import countTask from "../classes/countTask.js";
import tokenUsername from "../classes/tokenUsername.js";
import taskMethods from "../classes/taskMethods.js";

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

    let taskObj = taskMethods.getTaskFromForm(document.getElementById("add-task-form"));
    taskMethods.addTask(taskObj);
})
