var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var teacherMadeModuleSchema = new Schema({
  name: String,
  displayName: String,
  dateCreated: { type: Date, default: Date.now() },
  teacherNames: [],
  questionArray: []
});

// Compile model from schema
var teacherMadeModule = mongoose.model(
  "teacherMadeModule",
  teacherMadeModuleSchema
);

module.exports = teacherMadeModule;
