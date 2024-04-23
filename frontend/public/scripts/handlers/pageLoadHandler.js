import tokenUsername from "../classes/tokenUsername.js";
import taskDisplay from "../classes/taskDisplay.js";
import taskCount from "../classes/countTask.js";
import projectDisplay from "../classes/projectDisplay.js";
import userSettings from "../classes/userSettings.js";
import labelDisplay from "../classes/labelDisplay.js";

window.addEventListener("load", async (e) => {
    e.preventDefault();

    Notification.requestPermission();

    document.getElementById("username").innerText = tokenUsername.getUsername();
    userSettings.setUserImage();
    await taskDisplay.correctPageDisplay(
        document.getElementById("page-name").innerHTML
    );
    projectDisplay.display();
    labelDisplay.display();

    taskCount.correctTaskCount();
});
