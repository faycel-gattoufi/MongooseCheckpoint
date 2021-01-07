let express = require("express");
let app = express();
let port = 4000;
let createUser = require("./routes/createUser");
let findUser = require("./routes/findUser");
let User = require("./models/User");
const connectDB = require("./helper/connectDB");

app.listen(port, function () {
  console.log(
    "The server is running, " +
      " please, open your browser on http://localhost:%s",
    port
  );
});
connectDB();
//Create a record and save it
app.use("/User", createUser);
//Find a record
app.use("/findUser", findUser);

//Perform Classic Updates by Running Find, Edit, then Save
function addHamb(food) {
  let test = false;
  food.map((el) => {
    if (el.toLowerCase() === "hamburger") {
      test = true;
      return food;
    }
  });
  if (!test) food.push("Hamburger");
  return food;
}
app.put("/updateFood/:id", (req, res) => {
  User.findById({ _id: req.params.id }, (err, result) => {
    if (err) res.send("Error");
    else {
      addHamb(result.favouriteFoods);
      result.save(function (err) {
        if (err) console.error("ERROR!");
      });
      res.send(result);
    }
  });
});

//Update a user Using model.findOneAndUpdate()
app.put("/updateAge/:name", (req, res) => {
  User.findOneAndUpdate({ name: req.params.name }, { age: 20 }, { new: true })
    .then((docs) => res.send(docs))
    .catch((err) => res.send(err));
});
//find all users
app.get("/", (req, res) => {
  console.log(req.params);
  User.find()
    .exec()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => res.send(err));
});

// Delete a user by
app.delete("/delete/:id", (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(`<h1>user removed: </h1>${result}`);
    }
  });
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()
app.delete("/deleteMary", (req, res) => {
  User.remove({ name: "Mary" }, (err, result) => {
    if (err) {
      res.send(err);
    } else res.send(result);
  });
});

// Chain Search Query Helpers to Narrow Search Results
app.get("/burrito", (req, res) => {
  User.find({ favouriteFoods: "burrito" })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: false })
    .exec((err, data) => {
      if (err) {
        res.send(err);
      } else {
        if (!data[0]) {
          res.send("<h1>No User like Burrito</h1>");
        } else res.send(data);
      }
    });
});
