const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { secret } = require("../services/secret");

class UserController {
    async setUsername(req, res) {
        const username = req.query.username;

        try {
            const newUsername = req.body.username;
            await User.updateOne(
                { name: username },
                {
                    $set: {
                        name: newUsername,
                    },
                }
            );

            const token = jwt.sign({ username: newUsername }, secret, {
                expiresIn: "24h",
            });

            req.session.token = token;
            console.log(req.session.token);

            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async getPfp(req, res) {
        const username = req.query.username;
        try {
            const result = await User.findOne({ name: username });
            res.json(result.picture);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }

    async setPfp(req, res) {
        const username = req.query.username;

        try {
            await User.updateOne(
                { name: username },
                {
                    $set: {
                        picture: req.body.picture,
                    },
                }
            );

            res.status(200).send();
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        }
    }
}

module.exports = new UserController();
