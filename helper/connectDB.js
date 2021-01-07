const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  mongoose.connect(
    process.env.DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else console.log("database connected");
    }
  );
};
module.exports = connectDB;
