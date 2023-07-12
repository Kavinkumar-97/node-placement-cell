const Interview = require('../models/interview');
const Student = require('../models/student');
const Result = require('../models/result');
const dayjs = require('dayjs');

module.exports.renderInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({});
    return res.render('interviews', { interviews, dayjs });
  } catch (e) {
    return res.status(404).send(error);
  }
};

module.exports.renderCreate = (req, res) => {
  res.render('interviews/create');
};

module.exports.renderInterviewAllocation = async (req, res) => {
  try {
    const students = await Student.find({ placement: 'not_placed' });
    const interview = await Interview.findById(req.params.id);

    return res.render('interviews/allocate', { students, interview });
  } catch (e) {
    return res.status(404).send(e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { company, date } = req.body;
    const interview = await Interview.create({ company, date });
    console.log(interview);
    if (interview) {
      return res.redirect('/interviews');
    } else {
      return res.status(401).send('Unable to create a interview');
    }
  } catch (e) {
    return res.status(404).send(error);
  }
};

module.exports.allocateStudent = async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const interview = await Interview.findById(id);
    const student = await Student.findById(studentId);
    console.log(id, studentId);
    const result = await Result.create({
      interview: interview._id,
      student: student._id,
      result: 'on-hold',
    });
    console.log(result, student, interview);
    if (interview && student && result) {
      interview.students.push(studentId);
      student.interviews.push(id);

      student.save();
      interview.save();

      return res.redirect('back');
    } else {
      return res.status(401).send('Unable to create a interview');
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};
