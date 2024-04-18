const User = require("../models/user");

class dailyGoalController {
    async getGailyGoal(req, res) {
        const username = req.query.username;

        try {
            const user = await User.findOne({ name: username });
            res.json(user.dailyGoal);
        } catch (error) {
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async changeDailyGoal(req, res) {
        const username = req.query.username;
        await User.updateOne(
            { name: username },
            {
                $set: {
                    dailyGoal: req.body.goal,
                },
            }
        );

        res.status(200).send();
    }
}

module.exports = new dailyGoalController();
