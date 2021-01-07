let express = require("express");
let router = express.Router();
let User = require("../models/User");

// find people having the same name
router.get("/:user", (req, res) => {
  User.find({ name: req.params.user })
    .exec()
    .then((docs) => {
      console.log(docs);
      if (docs[0]) {
        res.send(docs);
      } else res.send("<h1>User not found!</h1>");
    });
});

//find one User bye favourite food
router.get("/food/:food", (req, res) => {
  User.findOne({ favouriteFoods: req.params.food }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        res.send(result);
      } else res.send(`<h1>No User like ${req.params.food}</h1>`);
    }
  });
});

//find User by ID
router.get("/id/:id", (req, res) => {
  User.findById({ _id: req.params.id }, (err, result) => {
    console.log(result);
    if (err) {
      res.send("<h1>User not found!</h1>");
    } else {
      res.send(result);
    }
  });
});
module.exports = router;
