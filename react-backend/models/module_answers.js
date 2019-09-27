var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var module_Answer_Schema = new Schema({
  moduleID: String,
  userID: String,
  questionsAndAnswers: [],
  dateSubmitted: { type: Date, default: Date.now() }
});

var moduleResponses = mongoose.model("moduleResponses", module_Answer_Schema);

module.exports = moduleResponses;
