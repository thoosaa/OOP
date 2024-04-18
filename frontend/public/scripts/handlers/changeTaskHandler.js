import countTask from "../classes/countTask.js";
import taskDisplay from "../classes/taskDisplay.js";
import taskMethods from "../classes/taskMethods.js";

const changeTaskModal = document.getElementById("change-task-modal");
const changeTaskBtn = document.getElementById("change-task-button");
const closeChangeModal = document.getElementById("close-change-task");
const form = document.getElementById("change-task-form");
const taskContainer = document.getElementById("task-display");
const gridColumnContainer = document.getElementById("date-display");

let oldTaskName;

async function handleClick(e) {
    e.preventDefault();
    const target = e.target;

    if (target.closest("button")) {
        console.log(target.closest("button"));
        let taskObj = taskMethods.getTaskFromTask(
            target.closest("button").parentElement.parentElement,
            true
        );
        taskObj["done"] = ["true", new Date().toISOString().slice(0, 10)];
        await taskMethods.markDone(taskObj);

        await countTask.correctTaskCount();
        return;
    }

    if (
        target.closest("div").parentElement.className == "task" ||
        target.closest("div".className == "task")
    ) {
        let taskEl =
            target.closest("div").parentElement.className == "task"
                ? target.closest("div").parentElement
                : target.closest("div");

        let taskObj = taskMethods.getTaskFromTask(taskEl, false);
        taskMethods.fillFormFromObj(form, taskObj);

        oldTaskName = taskObj["name"];

        changeTaskModal.showModal();
    }
}

taskContainer.addEventListener("click", handleClick);
gridColumnContainer.addEventListener("click", handleClick);

closeChangeModal.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    changeTaskModal.close();
});

changeTaskBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let taskObj = taskMethods.getTaskFromForm(form);
    console.log(taskObj);

    const response = await taskMethods.changeTask(taskObj, oldTaskName);

    changeTaskModal.close();
});
