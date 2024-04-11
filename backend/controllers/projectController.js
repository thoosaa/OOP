const User = require('../models/user');

class projectController{
    async getProjects(req, res) {
        const username = req.query.username;

        try {
            const check = await User.findOne({ name: username });
            res.json(check.projects);
        }
        catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }

    addProject(req, res) {
        const username = req.query.username;
        User.updateOne({ name: username }, {
            $push: {
                projects: req.body
            }
        }).exec()

        console.log(req.body);

        res.status(200).send();
    }

}

module.exports = new projectController();