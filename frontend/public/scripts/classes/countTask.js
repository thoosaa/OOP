import tokenUsername from "../classes/tokenUsername.js";

class TaskCount {
    async #getAll() {
        const res = await fetch(
            `http://localhost:5000/task/countAll?username=${tokenUsername.getUsername()}`
        );
        const data = await res.json();
        return data;
    }

    async #getToday() {
        const res = await fetch(
            `http://localhost:5000/task/countToday?username=${tokenUsername.getUsername()}`
        );
        const data = await res.json();
        return data;
    }

    async getMissed() {
        const res = await fetch(
            `http://localhost:5000/task/countMissed?username=${tokenUsername.getUsername()}`
        );
        const data = await res.json();
        return data;
    }

    async correctTaskCount() {
        const countToday = await this.#getToday();
        document.getElementById("today-task-number").innerText = countToday;

        const countMissed = await this.getMissed();
        document.getElementById("missed-task-number").innerText = countMissed;

        const countAll = await this.#getAll();
        document.getElementById("icoming-task-number").innerText =
            countAll - countMissed > 0 ? countAll - countMissed : 0;
    }

    async getDoneToday() {
        const res = await fetch(
            `http://localhost:5000/task/getDoneToday?username=${tokenUsername.getUsername()}`
        );
        const data = await res.json();
        return data;
    }
}

export default new TaskCount();
