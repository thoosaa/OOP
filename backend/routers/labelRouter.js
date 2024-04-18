const Router = require("express");
const path = require("path");
const router = new Router();
const User = require("../models/user");
const controller = require("../controllers/labelController");

router.get("/get", controller.getLabels);

router.post("/add", controller.addLabel);

module.exports = router;
