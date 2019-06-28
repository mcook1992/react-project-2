var express = require("express");
var router = express.Router();
var User = require("../models/users");
var QuizAnswers = require("../models/surveyResults");
var passport = require("../configure/passportConfig");
var Group = require("../models/classes");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/failed", function(req, res, next) {
  console.log("failed login");
});

router.get("/logOut", function(req, res, next) {
  console.log("Logging out");
  req.logOut();
});

router.get("/success", function(req, res, next) {
  console.log("successful login");
});

router.post("/", function(req, res, next) {
  console.log(req.body);

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
          res.json({
            id: 1,
            username: req.body,
            authenticated: true
          });
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

router.get("/addClasses", function(req, res, next) {
  console.log("Register the add classes request");
  if (req.session.passport) {
    User.findOne({ username: req.session.passport.user.username }, function(
      err,
      data
    ) {
      if (!err) {
        console.log("Successfully got a user for the add classes page");
        res.json({
          currentClasses: data.classNames,
          accountType: data.accountType
        });
      }
    });
  }
});

router.post("/addClasses", function(req, res, next) {
  console.log("Register the add classes post request");
  if (req.session.passport) {
    Group.findOne({ name: req.body.newClassName }, function(err, data) {
      if (data) {
        console.log("this group does exist already");
      } else {
        console.log("this group does not exist yet.");

        var newGroup = new Group({
          name: req.body.newClassName,
          teacherNames: [req.session.passport.user.username]
        });
        newGroup.save(function(err) {
          if (!err) {
            console.log("New group created successfully");

            //adding a teacher to the class
          }
        });
      }
    });

    User.findOne({ username: req.session.passport.user.username }, function(
      err,
      data
    ) {
      if (!err) {
        data.classNames.push(req.body.newClassName);
        data.save(function(err) {
          if (!err) {
            console.log("Successfully added a class");
            res.json({
              classNames: data.classNames
            });
          }
        });
      }
    });
  }
});

router.post("/joinClasses", function(req, res, next) {
  console.log("registering the join classes request");
  if (req.session.passport) {
    // console.log("User is logged in");
    console.log(req.body.newClassName);
    Group.findOne({ name: req.body.newClassName }, function(err, data) {
      if (data) {
        console.log("this group does exist already");
        data.studentNames.push(req.session.passport.user.username);
        data.save(function(err) {
          if (!err) {
            res.json({
              newClass: req.body.newClassName
            });
          }
        });
      } else {
        console.log("this group does not exist yet.");
      }
    });
  }
});

router.get("/displayClass/:classname", function(req, res, next) {
  console.log("registering display things");
  Group.findOne({ name: req.params.classname }, function(err, data) {
    if (data) {
      if (req.session.passport.user.username == data.teacherNames[0]) {
        res.json({
          studentNameArray: data.studentNames
        });
      }
    } else {
      console.log("We couldn't find the class");
    }
  });
});

router.get("/studentProfiles/:name", function(req, res, next) {
  //add security
  console.log(
    "registering that we are getting the request to show student info"
  );
  QuizAnswers.find(
    {
      studentID: req.params.name
    },
    function(err, data) {
      // console.log(data);

      User.findOne({ username: req.params.name }, function(err, user) {
        console.log(user.modulesCompleted);
        res.json({
          data: data,
          modules: user.modulesCompleted
        });
      });
    }
  );
});

module.exports = router;
