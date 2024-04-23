const Router = require("express");
const router = new Router();
const controller = require("../controllers/notificationController");

router.get("/get", controller.getUserNotifications);

module.exports = router;
