var express = require("express");
var router = express.Router();
var User = require("../models/users");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", function(req, res, next) {
  console.log(req.body);
  res.json({
    id: 1,
    username: req.body
  });

  var newUser = new User({ username: "test" });
  newUser.save(function(err) {
    if (!err) console.log("Success");
  });
});
module.exports = router;
