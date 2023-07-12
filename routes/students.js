const router = require('express').Router();
const studentController = require('../controllers/student_controller');

router.get('/', studentController.renderStudents);
router.get('/create', studentController.renderCreateStudent);
router.post('/create', studentController.create);

module.exports = router;
