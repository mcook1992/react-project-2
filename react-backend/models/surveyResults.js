var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var quizSchema = new Schema({
  quizID: String,
  studentID: String,
  questionAnswers: [],
  dateSubmitted: { type: Date, default: Date.now() }
});

module.exports = quizSchema;
