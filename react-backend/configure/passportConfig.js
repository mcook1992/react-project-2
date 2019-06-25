var User = require("../models/users");

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      console.log(user.password);

      //   if (user.password == password) {
      //     return done(null, false, { message: "Incorrect password." });
      //   }

      //Something is wrong with the return--it console logs everything and gets most of the way to the end, but then something goes wrong
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
