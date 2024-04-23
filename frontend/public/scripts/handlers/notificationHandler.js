import notification from "../classes/notification.js";

function checkTimeAndNotify(name, des, hour, minute) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === hour && currentMinute === minute) {
        if (Notification.permission == "granted") {
            const notification = new Notification(name, {
                body: des,
                icon: "https://static-00.iconduck.com/assets.00/todoist-icon-512x512-v3a6dxo9.png",
            });
        }
    }
}

async function trackTimes() {
    const times = await notification.getNotification();
    console.log("okk");
    console.log(times);

    times.forEach(([name, description, [hour, minute]]) => {
        checkTimeAndNotify(name, description, hour, minute);
    });
}

setInterval(trackTimes, 60000);
