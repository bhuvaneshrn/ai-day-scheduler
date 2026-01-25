const Task = require("./models/task");

exports.createTask = async (req, res) => {
  try {
    const { title, priority, deadline, duration, category } = req.body;

    if (!title || !deadline || !duration) {
      return res.status(400).json({
        message: "Title, deadline and duration are required",
      });
    }

    const task = await Task.create({
      title,
      priority,
      deadline,
      duration,
      category,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};
