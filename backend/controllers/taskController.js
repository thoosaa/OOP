const User = require("../models/user");

class taskController {
    async getAll(req, res) {
        const username = req.query.username;

        try {
            const user = await User.findOne({ name: username });
            const tasks = user.tasks.filter((task) => task.done[0] == "false");
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async getDone(req, res) {
        const username = req.query.username;

        try {
            const user = await User.findOne({ name: username });
            const tasks = user.tasks.filter((task) => task.done[0] == "true");
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async getMissed(req, res) {
        const username = req.query.username;
        const today = new Date().toISOString().slice(0, 10);

        try {
            const user = await User.findOne({ name: username });
            const tasks = user.tasks.filter(
                (task) => task.done[0] == "false" && task.deadline < today
            );
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async getToday(req, res) {
        const username = req.query.username;

        try {
            const today = new Date().toISOString().slice(0, 10);
            const user = await User.findOne({ name: username });
            const tasks = user.tasks.filter(
                (task) => task.done[0] == "false" && task.deadline == today
            );
            res.json(tasks);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async getDoneToday(req, res) {
        const username = req.query.username;

        try {
            const today = new Date().toISOString().slice(0, 10);
            const user = await User.findOne({ name: username });
            const tasks = user.tasks.filter(
                (task) => task.done[0] == "true" && task.done[1] == today
            ).length;
            res.json(tasks);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async getProject(req, res) {
        const { username, projectName } = req.query;

        try {
            const user = await User.findOne({ name: username });
            const tasks = user.tasks.filter(
                (task) => task.done[0] == "false" && task.project == projectName
            );
            res.json(tasks);
        } catch {
            console.log(error);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async getLabel(req, res) {
        const { username, labelName } = req.query;

        try {
            const user = await User.findOne({ name: username });
            const tasks = user.tasks.filter(
                (task) => task.done[0] == "false" && task.label == labelName
            );
            res.json(tasks);
        } catch {
            console.log(error);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async countAll(req, res) {
        const username = req.query.username;

        try {
            const user = await User.findOne({ name: username });
            const len = user.tasks.filter(
                (task) => task.done[0] == "false"
            ).length;
            console.log(len);
            res.json(len);
        } catch (error) {
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async countMissed(req, res) {
        const username = req.query.username;
        const today = new Date().toISOString().slice(0, 10);

        try {
            const user = await User.findOne({ name: username });
            const len = user.tasks.filter(
                (task) => task.done[0] == "false" && task.deadline < today
            ).length;
            res.json(len);
        } catch (error) {
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async countToday(req, res) {
        const username = req.query.username;

        try {
            const today = new Date().toISOString().slice(0, 10);
            const user = await User.findOne({ name: username });
            const len = user.tasks.filter(
                (task) => task.done[0] == "false" && task.deadline == today
            ).length;
            console.log(len);
            res.json(len);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async addTask(req, res) {
        const username = req.query.username;
        console.log(req.body);
        User.updateOne(
            { name: username },
            {
                $push: {
                    tasks: req.body,
                },
            }
        ).exec();

        res.status(200).send();
    }

    async markDone(req, res) {
        const username = req.query.username;
        const task = req.body;
        await User.updateOne(
            { name: username, "tasks.name": task.name },
            {
                $set: {
                    "tasks.$": req.body,
                },
            }
        );

        res.status(200).send();
    }

    async changeTask(req, res) {
        const { username, taskName } = req.query;
        const task = req.body;

        await User.updateOne(
            { name: username, "tasks.name": taskName },
            {
                $set: {
                    "tasks.$": task,
                },
            }
        );

        res.status(200).send();
    }
}

module.exports = new taskController();
