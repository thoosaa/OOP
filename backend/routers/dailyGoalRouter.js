const Router = require('express')
const path = require('path')
const router = new Router()
const User = require('../models/user')
const controller = require('../controllers/dailyGoalController')

router.get('/get', controller.getGailyGoal);

module.exports = router