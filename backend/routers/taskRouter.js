const Router = require("express");
const path = require("path");
const router = new Router();
const User = require("../models/user");
const controller = require("../controllers/taskController");

router.get("/get", controller.getAll);

router.get("/getMissed", controller.getMissed);

router.get("/getDone", controller.getDone);

router.get("/getToday", controller.getToday);

router.get("/getDoneToday", controller.getDoneToday);

router.get("/getProject", controller.getProject);

router.get("/getLabel", controller.getLabel);

router.get("/countAll", controller.countAll);

router.get("/countToday", controller.countToday);

router.get("/countMissed", controller.countMissed);

router.post("/add", controller.addTask);

router.post("/markDone", controller.markDone);

router.post("/change", controller.changeTask);

module.exports = router;
