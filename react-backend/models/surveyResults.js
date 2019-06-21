var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var quizSchema = new Schema({
  quizID: String,
  studentID: String,
  quizQuestions: [],
  dateSubmitted: { type: Date, default: Date.now() }
});

var QuizAnswers = mongoose.model("QuizAnswers", quizSchema);

module.exports = QuizAnswers;
