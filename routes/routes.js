const { registerValidation, postValidation } = require('../middleswares/validation')
const indexControllers = require('../controllers/indexControllers');
const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');
const { isAuth, isAdmin } = require('../middleswares/auth')
const { check } = require("express-validator")
const router = require('express').Router();

// POST ROUTES

router.post('/login', userControllers.login.post)
router.post('/register', registerValidation, userControllers.register.post)
router.post('/join', isAuth, userControllers.join.post)
router.post('/new',postValidation, postControllers.create.post)

// GET ROUTES
router.get('/', indexControllers.home)
router.get('/login', userControllers.login.get)
router.get('/register', userControllers.register.get)
router.get('/join', isAuth, userControllers.join.get)
router.get('/logout', userControllers.logout)
router.get('/new', isAuth, postControllers.create.get)
router.get('/delete-post/:id', isAdmin, postControllers.delete)
router.get('/users', indexControllers.members)

module.exports = router;