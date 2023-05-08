const router = require('express').Router();
const interviewController = require('../controllers/interview_controller');

router.get('/', interviewController.renderInterviews);
router.post('/', interviewController.create);

module.exports = router;
