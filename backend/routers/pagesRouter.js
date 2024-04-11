const Router = require('express')
const path = require('path')
const router = new Router()
const isAuthenticated = require('../middleware/authMiddleware')

router.set('views', path.join(__dirname, '../../frontend/views'));
router.use(Router.static(path.join(__dirname, '../../frontend/public')));

router.get('/inbox', isAuthenticated, (req, res) => {
    res.render('./pages/inbox')
})

router.get('/today', isAuthenticated, (req, res) => {
    res.render('./pages/today')
})

router.get('/completedTasks', isAuthenticated, (req, res) => {
    res.render('./pages/completedTasks');
})

router.get('/', (req, res) => {
    res.redirect('/auth/login');
})


module.exports = router