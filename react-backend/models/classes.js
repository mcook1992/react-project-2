var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var groupSchema = new Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now() },
  studentNames: [],
  teacherNames: []
});

// Compile model from schema
var Group = mongoose.model("Group", groupSchema);

module.exports = Group;
