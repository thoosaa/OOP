const jwt = require("jsonwebtoken");
const { secret } = require("../services/secret");

module.exports = function isAuthenticated(req, res, next) {
    console.log(req.session.token);
    if (req.session.token) {
        next();
    } else {
        res.render("./pages/userNotFound");
    }
};
