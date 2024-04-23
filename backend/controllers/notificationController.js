const User = require("../models/user");

class notificationController {
    async getUserNotifications(req, res) {
        const username = req.query.username;

        try {
            const user = await User.findOne({ name: username });
            const today = new Date().toISOString().slice(0, 10);
            const tasks = user.tasks.filter(
                (task) => task.done[0] == "false" && task.deadline == today
            );
            const notifications = [];

            tasks.forEach((task) => {
                if (task.notification) {
                    notifications.push([
                        task.name,
                        task.description,
                        task.notification,
                    ]);
                }
            });

            res.json(notifications);
        } catch (error) {
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }
}

module.exports = new notificationController();
