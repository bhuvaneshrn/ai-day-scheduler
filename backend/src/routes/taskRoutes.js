const express = require("express");
const Task = require("../models/task");
const rescheduleTasks = require("../services/reschedulerService");


const router = express.Router();

// CREATE task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
router.put("/:id/complete", async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.status = "completed";
  task.completedAt = new Date();
  await task.save();

  res.json(task);
});

// AI RESCHEDULE tasks
router.post("/reschedule", async (req, res) => {
  try {
    const tasks = await Task.find({ status: "pending" })
    .sort({ priority: -1, deadline: 1 });

    let currentTime = new Date();

    for (let task of tasks) {
      task.scheduledStart = new Date(currentTime);
      task.scheduledEnd = new Date(
        currentTime.getTime() + task.duration * 60000
      );

      currentTime = task.scheduledEnd;
      await task.save();
    }

    res.json({
      message: "Tasks rescheduled successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
