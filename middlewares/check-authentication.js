function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/users/signin');
  }
}

module.exports = checkAuthentication;
