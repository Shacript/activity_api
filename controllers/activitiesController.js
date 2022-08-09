const Activities = require("../model/activitiesModel");

const { v4: uuidv4 } = require("uuid");

const getAllActivities = async (req, res, next) => {
  const activities = await Activities.find({
    user_id: "291e7fa0-6c5b-4568-b570-3a71df030b1d",
  });
  res.send(activities);
};

const getActivityById = async (req, res, next) => {
  res.send(req.activity);
};

const User = require("../model/userModel");

const createActivity = async (req, res, next) => {
  const user = await User.findOne({
    user_id: "291e7fa0-6c5b-4568-b570-3a71df030b1d",
  });

  try {
    const newActivity = new Activities({
      activity_id: uuidv4(),
      owner: user._id,
      ...req.body,
    });
    await newActivity.save();
    res.send(newActivity);
  } catch (error) {
    res.status(400).send(error);
  }
};

const editActivityById = async (req, res, next) => {
  const { comment, activity_type, date, duration } = req.body;

  if (comment) req.activity.comment = comment;
  if (activity_type) req.activity.activity_type = activity_type;
  if (date) req.activity.date = date;
  if (duration) req.activity.duration = duration;

  await req.activity.save();

  res.send(req.activity);
};

const removeActivityById = async (req, res, next) => {
  await req.activity.remove();

  res.status(204).send();
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  editActivityById,
  removeActivityById,
};
