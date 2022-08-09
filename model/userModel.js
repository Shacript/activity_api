const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  }
});

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;
