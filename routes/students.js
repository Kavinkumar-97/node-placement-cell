const router = require('express').Router();
const studentController = require('../controllers/student_controller');

router.get('/', studentController.renderStudents);
router.post('/', studentController.create);

module.exports = router;
