// src/server/itemModel.js

const mongoose = require("./db");

const itemSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    amount: Number,
    availability: String,
    description: String,
    image: String,
  },
  { collection: "items" }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
