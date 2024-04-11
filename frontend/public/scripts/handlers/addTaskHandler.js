import taskMethods from "../classes/taskMethods.js";

const addTaskNavBtn = document.getElementById('add-task');
const addTaskBtn = document.getElementById('add-task-button')

const closeModal = document.getElementById('close-add-task');

const addTaskModal = document.getElementById('add-task-modal');

const form = document.getElementById("add-task-form");

addTaskNavBtn.addEventListener('click', (e) => {
    e.preventDefault();
    form.reset();
    addTaskModal.showModal();
})

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    form.reset();
    addTaskModal.close();
})

addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let taskObj = taskMethods.getTaskFromForm(form);
    taskMethods.addTask(taskObj);

    form.reset();
})
