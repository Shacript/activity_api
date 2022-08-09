const User = require("../model/userModel");

const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res, next) => {
  const newUser = new User({ user_id: uuidv4(), ...req.body });

  await newUser.save();

  res.send(newUser);
};

const getUserById = async (req, res, next) => {
  const { user_id } = req.params;

  const user = await User.findOne({ user_id });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send(user);
};

module.exports = {
  createUser,
  getUserById,
};
