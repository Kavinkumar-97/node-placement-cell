const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    placement: {
      type: String,
      enum: ['placed', 'not_placed'],
      default: 'not_placed',
    },
    batch: {
      type: String,
      required: true,
    },
    courseScores: {
      dsaFinalScore: {
        type: Number,
        required: true,
      },
      webDFinalScore: {
        type: Number,
        required: true,
      },
      reactFinalScore: {
        type: Number,
        required: true,
      },
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
