import tokenUsername from "../classes/tokenUsername.js";
import countTask from "../classes/countTask.js";

class DailyGoal{
    async getDailyGoal() {
        const res = await fetch(`http://localhost:5000/dailyGoal/get?username=${tokenUsername.getUsername()}`);
        const data = await res.json();

        return data;
    }

    async changeDailyGoal(newGoal) {
        const res = await fetch(`http://localhost:5000/dailyGoal/change?username=${tokenUsername.getUsername()}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "goal": newGoal })
        });

        if (res.ok) {
            await this.correctDailyGoal();
        }
    }

    async correctDailyGoal() {
        const dailyGoalText = document.getElementById('daily-goal-number');
        const tasksDone = document.getElementById('tasks-done-number');

        dailyGoalText.innerText = await this.getDailyGoal();
        tasksDone.innerHTML = await countTask.getDoneToday();

        this.setProgress(tasksDone.innerHTML, dailyGoalText.innerText);
    }

    setProgress(done, dailyGoal) {
        let percent = (done * 100) / dailyGoal;
        const trophy = document.querySelector('.progress-ring-text tspan');

        if (percent >= 100) {
            trophy.style.fill = "#de4c4a";
            percent = 100;
        }
        else {
            trophy.style.fill = "white";
        }

        const circle = document.querySelector('.progress-ring-circle');
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
  
        const offset = circumference - percent / 100 * circumference;
  
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
    }
}

export default new DailyGoal();