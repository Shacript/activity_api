const express = require("express");
const authRoute = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

authRoute.post("/signin", authController.signIn);

authRoute.post("/signup", userController.createUser);

authRoute.post("/signout", authController.signOut);

module.exports = authRoute;
