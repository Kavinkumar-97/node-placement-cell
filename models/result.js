const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
      required: true,
    },
    result: {
      type: String,
      enum: ['pass', 'fail', 'on-hold', 'not-attempt'],
      default: 'on-hold',
    },
  },
  { timestamps: true }
);

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
