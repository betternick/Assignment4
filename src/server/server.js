// server/server.js
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// const Item = require("./itemModel");

// // src/server/server.js
// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/ReactCardmaker", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected..."))
//   .catch((err) => console.log(err));

// const itemSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   amount: Number,
//   availability: String,
//   description: String,
//   image: String,
// });

// const Item = mongoose.model("Item", itemSchema);

// let items = require("./data");

const Item = require("./itemModel");

// try {
//   app.get("/items", (req, res) => {
//     res.json(items);
//   });
//   app.get("/search", (req, res) => {
//     const results = items.filter((el) =>
//       el.name.toLowerCase().includes(req.query.q.toLowerCase())
//     );
//     res.json(results);
//   });

//   app.get("/items/:name", (req, res) => {
//     const item = items.find((item) => item.name === req.params.name);
//     res.json(item);
//   });

//   app.delete("/items", (req, res) => {
//     items = [];
//     res.json(items);
//   });

//   app.post("/items", (req, res) => {
//     items.push(req.body);
//     res.json(items);
//   });

//   app.delete("/items/:name", (req, res) => {
//     items = items.filter((item) => item.name !== req.params.name);
//     res.json(items);
//   });

//   app.patch("/items/:name", (req, res) => {
//     const index = items.findIndex((item) => item.name === req.params.name);
//     if (index !== -1) {
//       items[index] = req.body;
//     }
//     res.json(items);
//   });
// } catch (e) {
//   console.log(e);
// }

try {
  app.get("/items", async (req, res) => {
    const items = await Item.find({});
    res.json(items);
  });

  app.get("/search", async (req, res) => {
    const items = await Item.find({ name: new RegExp(req.query.q, "i") });
    res.json(items);
  });

  app.get("/items/:name", async (req, res) => {
    const item = await Item.findOne({ name: req.params.name });
    res.json(item);
  });

  app.delete("/items", async (req, res) => {
    await Item.deleteMany({});
    res.json([]);
  });

  app.post("/items", async (req, res) => {
    const item = new Item(req.body);
    console.log(req.body);
    await item.save();
    const items = await Item.find({});
    res.json(items);
  });

  app.patch("/items/:name", async (req, res) => {
    await Item.findOneAndUpdate({ name: req.params.name }, req.body);
    const items = await Item.find({});
    res.json(items);
  });

  app.delete("/items/:name", async (req, res) => {
    await Item.deleteOne({ name: req.params.name });
    const items = await Item.find({});
    res.json(items);
  });

  // app.listen(5000, () => {
  //   console.log("Server has started on port 5000");
  // });
} catch (error) {
  console.error(error);
}

app.listen(4000, () => {
  console.log("Server listening on http://localhost:4000");
});
