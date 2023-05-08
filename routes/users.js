const { Router } = require('express');
const passport = require('passport');

const router = Router();
const userController = require('../controllers/user_controller');
const checkAuthentication = require('../middlewares/check-authentication');

router.get('/signup', userController.renderSignUp);
router.get('/signin', userController.renderSignIn);
router.get('/logout', checkAuthentication, userController.logout);
router.post('/signup', userController.signUp);
router.post(
  '/create-session',
  passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/',
  }),
  userController.createSession
);

module.exports = router;
