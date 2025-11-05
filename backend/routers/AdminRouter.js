// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

// ✅ Get all users (role = user)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ Get all recruiters (role = recruiter)
router.get("/recruiters", async (req, res) => {
  try {
    const recruiters = await User.find({ role: "recruiter" });
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recruiters" });
  }
});

// ✅ Get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// ✅ Get all applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("userId", "name email")
      .populate("jobId", "title company")
      .populate("recruiterId", "name");

    // Format clean response
    const formatted = applications.map((app) => ({
      _id: app._id,
      userName: app.userId?.name || "N/A",
      jobTitle: app.jobId?.title || "N/A",
      recruiterName: app.recruiterId?.name || "N/A",
      status: app.status,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

module.exports = router;
