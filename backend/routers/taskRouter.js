const Router = require("express");
const path = require("path");
const router = new Router();
const User = require("../models/user");
const controller = require("../controllers/taskController");

router.get("/get", controller.getAll);

router.get("/getDone", controller.getDone);

router.get("/getToday", controller.getToday);

router.get("/getDoneToday", controller.getDoneToday);

router.get("/getProject", controller.getProject);

router.get("/countAll", controller.countAll);

router.get("/countToday", controller.countToday);

router.post("/add", controller.addTask);

router.post("/markDone", controller.markDone);

router.post("/change", controller.changeTask);

module.exports = router;
