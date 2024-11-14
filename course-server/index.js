const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Connect to mongoose
mongoose.connect(
  "mongodb+srv://122suraj0:vRVJievSnIZDa7xI@cluster0.hvueraj.mongodb.net/",
  { dbName: "courseApp" }
);

// Entry point
app.get("/", (req, res) => {
  res.send("Welcome to course selling app");
});

// Invalid Routes
app.all("*", (req, res) => {
  res.status(404).send("Route not found - 404");
});

app.listen(PORT, () => {
  console.log(`The server started at ${PORT}`);
});
