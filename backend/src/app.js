const express = require("express");

const app = express();

// middleware
app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app; // 🚨 REQUIRED
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);

