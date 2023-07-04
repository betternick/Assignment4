// src/server/db.js

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ReactCardmaker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB successfully!");
});

// const itemSchema = new mongoose.Schema(
//   {
//     name: String,
//     price: Number,
//     amount: Number,
//     availability: String,
//     description: String,
//     image: String,
//   },
//   { collection: "items" }
// );

// const Item = mongoose.model("Item", itemSchema);

module.exports = mongoose;
