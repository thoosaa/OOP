const Router = require("express");
const router = new Router();
const controller = require("../controllers/projectController");

router.get("/get", controller.getProjects);

router.post("/add", controller.addProject);

module.exports = router;
