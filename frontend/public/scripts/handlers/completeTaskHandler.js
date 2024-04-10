const taskContainer = document.getElementById('task-display');
taskContainer.addEventListener('click', (e) => {
    e.preventDefault();

    let btn = e.target.closest('button');
    if (!btn) return;

    let task = btn.parentElement.parentElement;
    task.parentElement.removeChild(task);

    const colorPriorityMap = {
        "#de4c4a": "1",
        "#ffa600": "2",
        "#3c00ff": "3",
        "#696969": "4"
    };

    console.log(btn.style.color);
    
    let Priority = colorPriorityMap[btn.style.borderColor] || "";
    
    let notif = task.querySelector('.task-notification') == null ? "" : task.querySelector('.task-notification').innerHTML;
    
    let label = task.querySelector('.task-label') == null ? "nolabel" : task.querySelector('.task-label').innerHTML;
    
    let project = task.querySelector('.task-project') == null ? "inbox" : task.querySelector('.task-project').innerHTML;
    
    let taskObj = {
        name: task.querySelector('.task-name').innerText,
        description: task.querySelector('.task-des').innerText,
        deadline: task.querySelector('.task-datetime').innerText,
        notification: notif,
        priority: Priority,
        project: project,
        label: label,
        done: "true"
    };
    
    let oldObj = { ...taskObj, done: "false" };
    console.log(oldObj);
})

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('');