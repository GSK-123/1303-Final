const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answers: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  difficulty: { type: Number, required: true },
  timeLimit: { type: Number, required: true }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
