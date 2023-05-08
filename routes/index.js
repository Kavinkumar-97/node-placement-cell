const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');
const checkAuthentication = require('../middlewares/check-authentication');

router.get('/', checkAuthentication, homeController.home);
router.use('/users', require('./users'));
router.use('/interviews', checkAuthentication, require('./interviews'));
router.use('/students', checkAuthentication, require('./students'));

module.exports = router;
