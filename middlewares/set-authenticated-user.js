const setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  return next();
};

module.exports = setAuthenticatedUser;
