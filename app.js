const express = require('express');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

app.use(express.json());
app.use('/api/feedback', feedbackRoutes);

module.exports = app;
