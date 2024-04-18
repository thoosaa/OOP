const Router = require("express");
const path = require("path");
const router = new Router();
const User = require("../models/user");
const controller = require("../controllers/dailyGoalController");

router.get("/get", controller.getGailyGoal);

router.post("/change", controller.changeDailyGoal);

module.exports = router;
