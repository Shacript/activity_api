const mongoose = require("mongoose");

const activitiesSchema = new mongoose.Schema({
  activity_id: {
    type: String,
    required: true,
  },
  activity_type: {
    required: true,
    type: String,
    enum: ["cadio", "weige"],
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  comment: String,
});

const activitiesModel = new mongoose.model("Activities", activitiesSchema);

module.exports = activitiesModel;
