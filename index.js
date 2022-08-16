const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "asdjfklasdjklfjasldkjflkjlkasjlkfjldkasjflkajlskdf",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

require("dotenv").config();

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
  res.send(req.cookies);
});

const authSession = require("./middlewares/authSession");

// /auth
const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

// /activities
const activityRoutes = require("./routes/activitiesRoute");
app.use("/activities", authSession, activityRoutes);

// /users
const userRoutes = require("./routes/userRoute");
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
