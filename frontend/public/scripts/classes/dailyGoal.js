import tokenUsername from "../classes/tokenUsername.js";

class DailyGoal{
    async getDailyGoal() {
        const res = await fetch(`http://localhost:5000/dailyGoal/get?username=${tokenUsername.getUsername()}`);
        const data = await res.json();

        return data;
    }

    setProgress(done, dailyGoal) {
        const percent = (done * 100) / dailyGoal;

        if (percent == 100) {
            const trophy = document.querySelector('.progress-ring-text tspan');
            trophy.style.fill = "#de4c4a";
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