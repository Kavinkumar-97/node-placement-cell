const router = require('express').Router();
const interviewController = require('../controllers/interview_controller');

router.get('/', interviewController.renderInterviews);
router.get('/create', interviewController.renderCreate);
router.get('/:id/allocate', interviewController.renderInterviewAllocation);
router.get('/:id/allocate/:studentId', interviewController.allocateStudent);
router.post('/create', interviewController.create);

module.exports = router;
