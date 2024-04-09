const Router = require('express')
const path = require('path')
const router = new Router()
const User = require('../models/user')
const controller = require('../controllers/taskController')

router.get('/get', controller.getAll);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/getDone', controller.getDone);

router.get('/countAll', controller.countAll);

router.get('/countToday', controller.countToday);

router.post('/add', controller.addTask);

module.exports = router