var express = require("express");
var router = express.Router();
var User = require("../models/users");
var QuizAnswers = require("../models/surveyResults");
var passport = require("../configure/passportConfig");
var cookieParser = require("cookie-parser");
var Group = require("../models/classes");
var path = require("path");
/* GET home page. */

//trying to render react static pages
router.get("/", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../client/build/", "index.html"));
});

router.get("/isAuthenticated", function(req, res, next) {
  console.log("registering the authentication check");
  if (req.session.passport && req.user) {
    console.log(req.session.passport + req.user);
    res.json({
      isAuthenticated: true,
      username: req.session.passport.user.username,
      accountType: req.user.userna
    });
  }
});

router.get("/signOut", function(req, res, next) {
  console.log("Logging out");
  req.logout();
  res.clearCookie("cookie");
  res.json({
    success: "logout successful!"
  });
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
          res.cookie("cookie", "value");
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

router.post(
  "/login",
  // passport.authenticate("local", { failWithError: true }),
  function(req, res, next) {
    console.log("We're calling the login route!");

    res.cookie("cookie", "value");

    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.json({
          authenticated: false,
          message: "incorrect username or password"
        });
      }

      if (user.password != req.body.password) {
        return res.json({
          authenticated: false,
          message: "incorrect username or password"
        });
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.json({
          username: req.session.passport.user.username,
          authenticated: true
        });
      });
    })(req, res, next);

    // if (req.session.passport.user) {
    //   res.json({
    //     username: req.session.passport.user.username,
    //     authenticated: true
    //   });
    // } else {
    //   res.json({
    //     err: "Invalid username or password."
    //   });
    // }
  }
);

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
          var incompletedAssignments = [];
          var completedAssignments = [];
          user.modulesAssigned.forEach(element => {
            if (element.complete) {
              completedAssignments.push(element);
            } else {
              incompletedAssignments.push(element);
            }
          });

          res.json({
            username: req.session.passport.user.username,
            data: data,
            modules: user.modulesCompleted,
            assignments: incompletedAssignments
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

//TKTKT also add here so that when student completes module, it updates on the assignments given portion
router.post("/learn/updateModulesCompleted", function(req, res, next) {
  console.log("registering this quiz request");
  console.log(req.body.module);
  if (req.session.passport) {
    User.findOne({ username: req.session.passport.user.username }, function(
      err,
      data
    ) {
      data.modulesCompleted.push(req.body.module);

      var counter = 0;
      var replacementArray = [];

      //searching through their assignment modules--if they already completed the module, update the date
      data.modulesAssigned.forEach(elem => {
        if (elem.modules == req.body.module.name) {
          newElem = elem;
          newElem.completed = true;
          newElem.dateCompleted = "New date here"; //need to update the real date here TKTK
          replacementArray.push(newElem);
          counter++;

          console.log(data.classNames);
          //go through all their classes and adjust the same module in all their classes as necessary
          data.classNames.forEach(className => {
            //go through each assignment in that class
            console.log(
              "We're searching the assignmentsGiven in this class " + className
            );
            //match the
            Group.findOneAndUpdate(
              {
                name: className,
                "assignmentsGiven.name": req.body.module.name
              },
              { $push: { "assignmentsGiven.$.completed": data.username } },
              function(err) {
                console.log("Something updated! Check the database!");
              }
            );
          });
        } else {
          replacementArray.push(elem);
          counter++;
        }

        //replace the old array of completeed assignments with the new, updated array (this feels like a lng way to do that)
        if (counter == data.modulesAssigned.length) {
          data.modulesAssigned = replacementArray;
          data.markModified("modulesAssigned");
          data.save(function(err) {
            console.log("Saved data");
          });
        }
      });

      // data.modulesAssigned.forEach(elem => {
      //   if (elem.modules == req.body.module.name) {
      //     elem.completed = true;
      //     elem.dateCompleted = "Test Date Here";
      //     console.log("new elem is" + elem);
      //     replacementArray.push(elem);
      //     counter++;
      //     if (counter == data.modulesAssigned.length) {
      //       console.log(
      //         "The replacement array is" + replacementArray[0].modules
      //       );
      //       data.modulesAssigned = replacementArray;
      //       data.save(function(err) {
      //         if (!err) {
      //           console.log("successfully added module!");
      //           // res.json({
      //           //   complete: "Completed!"
      //           // });
      //         }
      //       });
      //     }
      //   } else {
      //     replacementArray.push(elem);
      //     counter++;
      //     if (counter == data.modulesAssigned.length) {
      //       console.log(
      //         "The replacement array is" + replacementArray[0].modules
      //       );
      //       data.modulesAssigned = replacementArray;
      //       data.save(function(err) {
      //         if (!err) {
      //           console.log("successfully added module!");
      //           // res.json({
      //           //   complete: "Completed!"
      //           // });
      //         }
      //       });
      //     }
      //   }
      // });
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
          accountType: data.accountType,
          user: req.session.passport.user.username
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
        console.log("this class does not exist yet.");
      }
    });
  }
});

router.get("/displayClass/:classname", function(req, res, next) {
  console.log("registering display things");
  console.log(req.params.classname);
  var studentInfo = [];
  Group.findOne({ name: req.params.classname }, function(err, data) {
    if (data) {
      console.log("We found a class. Here's the info");
      console.log(data);
      if (req.session.passport.user.username == data.teacherNames[0]) {
        //grabbing stress etc. information from every student in their class
        var length = data.studentNames.length;
        var counter = 0;
        data.studentNames.forEach(element => {
          QuizAnswers.find({ studentID: element }, function(err, dat) {
            console.log("We found some students in the class");
            console.log(dat);
            if (!err) {
              studentInfo.push(dat);
              console.log("We pushed some data");
              counter++;
              if (counter == length) {
                res.json({
                  studentNameArray: data.studentNames,
                  data: studentInfo,
                  assignmentsGiven: data.assignmentsGiven
                });
              }
            } else {
              console.log(err);
            }
          });
        });
      } else {
        console.log("Wrong user logged in");
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

router.post("/createAssignment", function(req, res, next) {
  console.log("registering the create assignments request");

  console.log(req.body.moduleAssigned);
  var counter = 0;

  //TKTKTK

  req.body.moduleAssigned.forEach(elem => {
    console.log("The element is " + elem.label);

    Group.findOne({ name: req.body.classAssigned }, function(err, group) {
      console.log(group.teacherNames[0]);
      group.studentNames.forEach(element => {
        console.log(element);
        //for reach student, check if the completed thing should be true or false
        var newAssignmentObject = {
          modules: elem.label,
          completed: false
        };
        User.findOne({ username: element }, function(err, user) {
          user.modulesCompleted.forEach(mod => {
            if (mod.name == elem.label) {
              newAssignmentObject.completed = true;
              console.log(
                "student had already completed this assignment " + element
              );
            }
          });

          user.modulesAssigned.push(newAssignmentObject);
          user.save(function(err) {
            if (!err) {
              console.log(
                "successfully saved assignment to user " + user.username
              );
            }
          });
          console.log(user.username);
          counter++;
        });
      });
    });
  });

  if (counter == req.body.moduleAssigned.length)
    res.json({
      usersUpdated: ["complete", "complete"]
    });
  //tktktk insert extra
});

module.exports = router;
