import tokenUsername from "../classes/tokenUsername.js";

class TaskCount{
    async #getAll() {
        const res = await fetch(`http://localhost:5000/task/countAll?username=${tokenUsername.getUsername()}`);
        const data = await res.json();
        return data;
    }

    async #getToday() {
        const res = await fetch(`http://localhost:5000/task/countToday?username=${tokenUsername.getUsername()}`);
        const data = await res.json();
        return data;
    }

    async correctTaskCount() {
        const countAll = await this.#getAll();
        document.getElementById('icoming-task-number').innerText = countAll;
    
        const countToday = await this.#getToday();
        document.getElementById('today-task-number').innerText = countToday;
    }
}

export default new TaskCount();