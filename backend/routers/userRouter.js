const Router = require("express");
const path = require("path");
const router = new Router();
const User = require("../models/user");
const controller = require("../controllers/userController");

router.get("/getPfp", controller.getPfp);

router.post("/setPfp", controller.setPfp);

router.post("/setUsername", controller.setUsername);

module.exports = router;
