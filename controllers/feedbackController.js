const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');

const createFeedback = async (req, res) => {
  try {
    const { studentName, courseName, message, rating } = req.body;
    const feedback = await Feedback.create({ studentName, courseName, message, rating });
    res.status(201).json(feedback);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'page and limit must be positive numbers' });
    }

    const total = await Feedback.countDocuments();
    const feedbacks = await Feedback.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ page, limit, total, feedbacks });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid feedback id' });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.status(200).json(feedback);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createFeedback, getFeedbacks, updateStatus };
