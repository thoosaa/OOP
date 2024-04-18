const Router = require("express");
const path = require("path");
const router = new Router();
const User = require("../models/user");
const controller = require("../controllers/projectController");

router.get("/get", controller.getProjects);

router.post("/add", controller.addProject);

module.exports = router;
