import tokenUsername from "../classes/tokenUsername.js";
import taskDisplay from "../classes/taskDisplay.js";
import taskCount from "../classes/countTask.js";

window.addEventListener('load',async (e) => {
    e.preventDefault();

    document.getElementById('username').innerText = tokenUsername.getUsername();
    taskDisplay.correctPageDisplay(document.getElementById('page-name').innerHTML);

    taskCount.correctTaskCount();
})