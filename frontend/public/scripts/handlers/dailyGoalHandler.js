import dailyGoal from "../classes/dailyGoal.js";
import countTask from "../classes/countTask.js";

const dailyGoalBtn = document.getElementById('daily-goal');
const closeDailyModal = document.getElementById('close-daily-modal');
const dailyGoalModal = document.getElementById('daily-goal-modal');
const dailyGoalText = document.getElementById('daily-goal-number');
const tasksDone = document.getElementById('tasks-done-number');

dailyGoalBtn.addEventListener('click', async (e) => {
    dailyGoalText.innerText = await dailyGoal.getDailyGoal();
    tasksDone.innerHTML = await countTask.getDoneToday();

    dailyGoal.setProgress(tasksDone.innerHTML, dailyGoalText.innerText);
    dailyGoalModal.showModal();
})

closeDailyModal.addEventListener('click', (e) => {
    dailyGoalModal.close();
})
