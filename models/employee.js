const mongoose = require('mongoose');
const bcrypt = require('../config/bcrypt');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Before save we will hash password if it is change or newly created.
employeeSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashPassword = await bcrypt.hashPassword(this.password);

    if (!hashPassword) {
      next('Failed to register');
    }

    this.password = hashPassword;

    next();
  } catch (error) {
    next(error);
  }
});

employeeSchema.methods.checkPassword = async function (password) {
  return await bcrypt.checkPassword(password, this.password);
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
