const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../services/secret");

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при регистрации", errors });
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ name: username });
            if (candidate) {
                return res.status(400).json({
                    message: "Пользователь с таким именем уже существует",
                });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({ name: username, password: hashPassword });
            await user.save();
            return res
                .status(200)
                .json({ message: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Registration error" });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            console.log(username);
            const user = await User.findOne({ name: username });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: `Пользователь ${username} не найден` });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res
                    .status(400)
                    .json({ message: `Введен неверный пароль` });
            }
            const token = jwt.sign({ username: username }, secret, {
                expiresIn: "24h",
            });

            req.session.token = token;
            console.log(req.session.token);

            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Login error" });
        }
    }

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
        });

        res.status(200).send();
    }
}

module.exports = new authController();
