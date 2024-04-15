const User = require('../models/user');

class labelController{
    async getLabels(req, res) {
        const username = req.query.username;

        try {
            const check = await User.findOne({ name: username });
            res.json(check.labels);
        }
        catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }

    addLabel(req, res) {
        const username = req.query.username;
        User.updateOne({ name: username }, {
            $push: {
                labels: req.body
            }
        }).exec()

        res.status(200).send();
    }
}

module.exports = new labelController();