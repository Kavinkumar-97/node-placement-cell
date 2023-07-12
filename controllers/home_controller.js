const Result = require('../models/result');
const Student = require('../models/student');
const fs = require('fs');

module.exports.home = async (req, res) => {
  try {
    const results = await Result.find({}).populate(['student', 'interview']);
    return res.render('results', { results });
  } catch (e) {
    return res.status(404).send(e);
  }
};

module.exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findOneAndUpdate(
      { _id: req.params.id },
      { result: req.body.result },
      { new: true }
    );

    console.log(result);

    if (result.result == 'pass') {
      await Student.findOneAndUpdate(
        { _id: result.student },
        { placement: 'placed' }
      );
    }

    return res.redirect('/');
  } catch (e) {
    return res.status(404).send(e);
  }
};
module.exports.downloadReport = async (req, res) => {
  try {
    const results = await Result.find({}).populate(['student', 'interview']);

    let csvContent =
      'Student id,Student name,Student college,Student status,DSA Final Score,WebD Final Score,React Final Score,Interview Date,Interview Company,Interview Student Result\n';

    results.forEach((result) => {
      const { date, company } = result.interview;
      csvContent += `${result.student.id},${result.student.name},${result.student.college},${result.student.placement},${result.student.courseScores.dsaFinalScore},${result.student.courseScores.webDFinalScore},${result.student.courseScores.reactFinalScore},${date},${company},${result.result}\n`;
    });

    const filePath = 'report/report.csv';

    fs.writeFile(filePath, csvContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing CSV file:', err);
        return;
      }

      res.download(filePath, 'report.csv', (err) => {
        if (err) {
          return res.status(404).send(err);
        } else {
          res.redirect('back');
        }
      });
      console.log('CSV file generated:', filePath);
    });
  } catch (e) {
    console.error('Error downloading CSV file:', e);
    return res.status(404).send(e);
  }
};
