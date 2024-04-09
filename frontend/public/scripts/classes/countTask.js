import tokenUsername from "../classes/tokenUsername.js";

class TaskCount{
    async getAll() {
        const res = await fetch(`http://localhost:5000/task/countAll?username=${tokenUsername.getUsername()}`);
        const data = await res.json();
        return data;
    }

    async getToday() {
        const res = await fetch(`http://localhost:5000/task/countToday?username=${tokenUsername.getUsername()}`);
        const data = await res.json();
        return data;
    }
}

export default new TaskCount();