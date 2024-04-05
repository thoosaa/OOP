const Router = require('express')
const path = require('path')
const router = new Router()

const controller = require('../controllers/authController')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.set('views', path.join(__dirname, '../../frontend/views'));
router.use(Router.static(path.join(__dirname, '../../frontend/public')));

router.post('/signup', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration)

router.post('/login', controller.login)

router.get('/login', (req, res) => {
    res.render('./pages/login')
})

router.get('/signup', (req, res) => {
    res.render('./pages/signup')
})

module.exports = router