import taskDisplay from "../classes/taskDisplay.js";
import countTask from "../classes/countTask.js";
import tokenUsername from "../classes/tokenUsername.js";

class TaskMethods{
    getTaskFromForm(elem) {
        const addTaskModal = document.getElementById('add-task-modal');
        const formData = new FormData(elem);

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
    
        taskObj = this.#correctObj(taskObj);
        console.log(taskObj);

        return taskObj;
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

    async addTask(taskObj) {
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
}

export default new TaskMethods();