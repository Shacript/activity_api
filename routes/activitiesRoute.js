const express = require("express");

const activityRoutes = express.Router();

const Activities = require("../model/activitiesModel");

const activitiesController = require("../controllers/activitiesController");

activityRoutes.param("activity_id", async (req, res, next, activity_id) => {
  const activity = await Activities.findOne({
    activity_id: activity_id,
  });

  if (!activity) {
    return res.status(404).send();
  }

  req.activity = activity;

  next();
});

activityRoutes.get("/", activitiesController.getAllActivities);

activityRoutes.get("/:activity_id", activitiesController.getActivityById);

activityRoutes.post("/", activitiesController.createActivity);

activityRoutes.put("/:activity_id", activitiesController.editActivityById);

activityRoutes.delete("/:activity_id", activitiesController.removeActivityById);

module.exports = activityRoutes;
