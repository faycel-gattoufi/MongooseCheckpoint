let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
let Person = require("../models/User");

//add new user
router.post("/:person", (req, res) => {
  let person = new Person({
    name: req.params.person,
    age: req.body.age,
    favouriteFoods: req.body.favouriteFoods,
  });
  console.log(person);
  person.save((err, data) => {
    if (err) {
      res.send("<h1>User already has been stored</h1>");
    } else res.send(data);
  });
});

//Create many usser using an array of users from the body
router.get("/createMany", (req, res) => {
  Person.create(req.body);
  res.send("");
});
module.exports = router;
