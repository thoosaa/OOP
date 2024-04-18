import taskDisplay from "../classes/taskDisplay.js";
import countTask from "../classes/countTask.js";
import tokenUsername from "../classes/tokenUsername.js";

class TaskMethods{
    getTaskFromForm(elem) {
        const formData = new FormData(elem);

        let taskObj = {};
        formData.forEach((value, key) => {
            taskObj[key] = value;
        });

        taskObj['done'] = ['false'];

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
                }
            }
        });

        if (document.getElementById('label').value.trim() == "") {
            taskObj['label'] = "nolabel";
        }

        console.log(document.getElementById('deadline').value);
    
        taskObj = this.#correctObj(taskObj);
        console.log(taskObj);

        return taskObj;
    }

    getTaskFromTask(task, remove) {
        //let task = btn.parentElement.parentElement;
        if(remove) task.parentElement.removeChild(task);

        const colorPriorityMap = {
            "#de4c4a": "1",
            "#ffa600": "2",
            "#3c00ff": "3",
            "#696969": "4"
        };

        let Priority = colorPriorityMap[this.#rgbToHex(task.querySelector('.task-button').style.borderColor)] || "";
    
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
            done: ["true", new Date().toISOString().slice(0, 10)]
        };
    
        let oldObj = this.#correctObj({ ...taskObj, done: ["false"] });
        console.log(oldObj);

        return oldObj;
    }

    fillFormFromObj(form, taskObj) {
        Object.keys(taskObj).forEach(key => {
            const input = form.querySelector(`#${key}`);
            const selector = form.querySelector(`#${key}`);

            if (input) {
                input.value = taskObj[key];
            }
            if (selector) {
                selector.value = taskObj[key];
            }
        })
    }

    #correctObj(taskObj) {
        const orderedKeys = ['name', 'description', 'deadline', 'notification', 'priority', 'project', 'label', 'done'];
        const orderedTaskObj = {};
        orderedKeys.forEach(key => {
            if (taskObj.hasOwnProperty(key)) {
                orderedTaskObj[key] = taskObj[key];
            }
        });
        return orderedTaskObj;
    }

    #rgbToHex(rgbString) {
        const regex = /\((\d+), (\d+), (\d+)\)/;
        const match = rgbString.match(regex);
        if (!match) return null;
    
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    
        return hex;
    }

    async addTask(taskObj) {
        const addTaskModal = document.getElementById('add-task-modal');

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
                await countTask.correctTaskCount();
                addTaskModal.close();
            } else {
                console.error('Ошибка при выполнении запроса');
            }
    
    
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }

    async markDone(taskObj) {
        try {
            const response = await fetch(`http://localhost:5000/task/markDone?username=${tokenUsername.getUsername()}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(taskObj)
            });
    
            if (response.ok) {
                countTask.correctTaskCount();
                console.log('ok');
                
            } else {
                console.error('Ошибка при выполнении запроса');
            }
    
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }

    async changeTask(taskObj, oldTaskName) {
        try {
            const response = await fetch(`http://localhost:5000/task/change?username=${tokenUsername.getUsername()}&taskName=${oldTaskName}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(taskObj)
            });
    
            if (!response.ok) {
                console.error('Ошибка при выполнении запроса');
            }
            else {
                taskDisplay.correctPageDisplay(document.getElementById('page-name').innerText);
                countTask.correctTaskCount();
            }
    
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }
}

export default new TaskMethods();