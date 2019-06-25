var express = require("express");
var router = express.Router();
var User = require("../models/users");
var QuizAnswers = require("../models/surveyResults");
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
    if (!err) {
      req.logIn(newUser, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully logged in new user");
        }
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), function(req, res, next) {
  console.log("We're calling the login route!");
  console.log(req.session.passport.user.username);
  res.json({
    username: req.session.passport.user.username,
    authenticated: true
  });
});

router.post("/quizzes/:quizID/:name", function(req, res, next) {
  console.log("Registering Quiz Data");
  console.log(req.body);

  var newAnswers = new QuizAnswers({
    quizID: req.body.id,
    studentID: req.body.username,
    quizQuestions: req.body.array
  });
  newAnswers.save(function(err) {
    if (!err) console.log("Success");
    res.json({
      testvalue: "saved!"
    });
  });
});

router.get("/profile", function(req, res, next) {
  console.log("registering profile request");
  console.log(req.session);

  if (req.session.passport) {
    console.log("user logged in!");
    console.log(req.session.passport.user.username);
    QuizAnswers.find(
      {
        studentID: req.session.passport.user.username
      },
      function(err, data) {
        // console.log(data);

        User.findOne({ username: req.session.passport.user.username }, function(
          err,
          user
        ) {
          console.log(user.modulesCompleted);
          res.json({
            username: req.session.passport.user.username,
            data: data,
            modules: user.modulesCompleted
          });
        });
      }
    );
  } else {
    console.log("No user logged in");
    res.json({
      username: "User is not logged in"
    });
  }
});

router.post("/learn/updateModulesCompleted", function(req, res, next) {
  console.log("registering this quiz request");
  console.log(req.body.module);
  if (req.session.passport) {
    User.findOne({ username: req.session.passport.user.username }, function(
      err,
      data
    ) {
      data.modulesCompleted.push(req.body.module);
      data.save(function(err) {
        if (!err) {
          console.log("successfully added module!");
          res.json({
            complete: "Completed!"
          });
        }
      });
    });
  }
});

module.exports = router;
