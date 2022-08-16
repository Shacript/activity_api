const User = require("../model/userModel");

const bcrypt = require("bcrypt");

const signIn = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        req.session.userId = user.id;
        res.send({
          id: user.id,
          name: user.name,
          username: user.username,
        });
      } else {
        res.status(401).send("Authentication failed");
      }
    });
  } else {
    res.status(401).send("Authentication failed");
  }
};

const signOut = async (req, res, next) => {
  req.session.destroy();
  res.send("Success");
};

module.exports = {
  signIn,
  signOut,
};
