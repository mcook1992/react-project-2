var express = require("express");
var router = express.Router();
var User = require("../models/users");
var passport = require("../configure/passportConfig");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/failed", function(req, res, next) {
  console.log("failed login");
});

router.get("/success", function(req, res, next) {
  console.log("successful login");
});

router.post("/", function(req, res, next) {
  console.log(req.body);
  res.json({
    id: 1,
    username: req.body
  });

  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    accountType: req.body.accountType
  });
  newUser.save(function(err) {
    if (!err) console.log("Success");
  });
});
module.exports = router;

router.post("/login", passport.authenticate("local"), function(req, res, next) {
  console.log("We're calling the login route!");
  console.log(req.session.passport.user.username);
  res.json({
    username: req.session.passport.user.username,
    authenticated: true
  });
});
