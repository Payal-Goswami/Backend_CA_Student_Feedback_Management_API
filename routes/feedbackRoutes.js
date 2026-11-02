const express = require('express');
const { createFeedback, getFeedbacks, updateStatus } = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', createFeedback);
router.get('/', getFeedbacks);
router.patch('/:id', updateStatus);

module.exports = router;
