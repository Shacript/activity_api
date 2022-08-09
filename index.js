const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

require("dotenv").config();

const mongoose = require("mongoose");

app.use(async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

app.get("/", (req, res, next) => {
  res.send("test");
});

// /activities
const activityRoutes = require("./routes/activitiesRoute");
app.use("/activities", activityRoutes);

// /users
const userRoutes = require("./routes/userRoute");
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
