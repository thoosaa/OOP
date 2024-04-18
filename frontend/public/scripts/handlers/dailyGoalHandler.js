import dailyGoal from "../classes/dailyGoal.js";
import countTask from "../classes/countTask.js";

const dailyGoalBtn = document.getElementById('daily-goal');
const closeDailyModal = document.getElementById('close-daily-modal');
const dailyGoalModal = document.getElementById('daily-goal-modal');
const changeDailyGoal = document.querySelector('#change-daily-goal button');

dailyGoalBtn.addEventListener('click', async (e) => {
    await dailyGoal.correctDailyGoal();
    dailyGoalModal.showModal();
})

closeDailyModal.addEventListener('click', (e) => {
    dailyGoalModal.close();
})

changeDailyGoal.addEventListener('click', (e) => {
    const newDailyGoal = document.querySelector('#goal-changer input').value;
    dailyGoal.changeDailyGoal(newDailyGoal);
})