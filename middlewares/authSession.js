const User = require("../model/userModel");

const authSession = async (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).send("You are not authenticated");

  req.user = await User.findOne({ id: req.session.userId });

  if (!req.user) return res.status(401).send("You are not authenticated");

  next();
};

module.exports = authSession;
