const passport = require('passport');
const LocalStatergy = require('passport-local').Strategy;

const Employee = require('../models/employee');

passport.use(
  new LocalStatergy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
      try {
        const employee = await Employee.findOne({ email: email });

        if (!employee || !employee.checkPassword(password)) {
          return done(null, false);
        }

        return done(null, employee);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (employee, done) {
  done(null, employee._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const employee = await Employee.findById(id);
    done(null, employee);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
