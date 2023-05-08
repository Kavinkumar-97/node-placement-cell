const Employee = require('../models/employee');

module.exports.renderSignUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return res.render('auth/signup');
};

module.exports.renderSignIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return res.render('auth/signin');
};

module.exports.signUp = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }

    const { name, email, password, confirmPassword } = req.body;

    let employee = await Employee.findOne({ email: email });
    if (employee) {
      return res.redirect('/users/signin');
    }

    if (password !== confirmPassword) {
      return res.redirect('/users/signup');
    }

    employee = await Employee.create({ email, name, password });
    return res.redirect('/users/signin');
  } catch (e) {
    return res.status(500).redirect('/users/signup');
  }
};

module.exports.createSession = (req, res) => {
  res.redirect('/');
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
