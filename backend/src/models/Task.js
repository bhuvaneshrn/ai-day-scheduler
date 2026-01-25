const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: Number, // 1 (low) - 5 (high)
      default: 3,
    },
    deadline: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    category: {
      type: String,
      enum: ["work", "study", "personal", "health"],
      default: "work",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "delayed"],
      default: "pending",
    },
    scheduledStart: {
      type: Date,
    },
    scheduledEnd: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
