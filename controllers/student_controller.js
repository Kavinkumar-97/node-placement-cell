const Student = require('../models/student');

module.exports.renderStudents = async (req, res) => {
  try {
    const students = await Student.find({}).populate('courseScores');

    return res.render('students', { students });
  } catch (error) {
    return res.status(404).send(error);
  }
};

module.exports.renderCreateStudent = (req, res) => {
  res.render('students/create');
};

module.exports.create = async (req, res) => {
  try {
    let student = await Student.findOne({ email: req.body.email });
    console.log(req.body);
    console.log(student);

    if (student) {
      return res.send(401).send('Student Exists');
    }

    const { email, name, college, batch, dsaFinalScore, webDFinalScore, reactFinalScore } = req.body;

    student = await Student.create({
      email,
      name,
      college,
      batch,
      courseScores: {
        dsaFinalScore: parseInt(dsaFinalScore), webDFinalScore: parseInt(webDFinalScore), reactFinalScore: parseInt(reactFinalScore)
      }
    });

    if (student) {
      return res.send(200).redirect('/students');
    } else {
      return res.status(401).send('Unable to create a student');
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};
