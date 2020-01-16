var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  dateCreated: { type: Date, default: Date.now() },
  accountType: String,
  modulesAssigned: [],
  assignmentsGiven: [], //use this to track teacher assignments
  modulesCompleted: [],
  classNames: []
});

// Compile model from schema
var User = mongoose.model("User", userSchema);

module.exports = User;
