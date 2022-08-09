const express = require("express");

const userRoutes = express.Router();

const userController = require("../controllers/userController");

userRoutes.get("/:user_id", userController.getUserById);
userRoutes.post("/", userController.createUser);

module.exports = userRoutes;
