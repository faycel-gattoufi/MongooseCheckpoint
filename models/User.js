let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favouriteFoods: [String],
});
module.exports = mongoose.model("User", userSchema);
