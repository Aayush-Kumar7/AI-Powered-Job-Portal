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
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL
    const updateData = req.body; // Data sent from frontend (name, email, etc.)

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true, // Validate before saving
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server Error" });
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
router.put("/recruiters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Example: { name, companyName, email, phone }

    const updatedRecruiter = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated record
      runValidators: true,
    });

    if (!updatedRecruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json({
      message: "Recruiter updated successfully",
      recruiter: updatedRecruiter,
    });
  } catch (error) {
    console.error("Error updating recruiter:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// =======================================
// ✅ 3️⃣ Delete Recruiter (DELETE)
// =======================================
router.delete("/recruiters/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecruiter = await User.findByIdAndDelete(id);

    if (!deletedRecruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    console.error("Error deleting recruiter:", error);
    res.status(500).json({ message: "Server Error" });
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

router.put("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Get data from request body
    const updateData = req.body;
    console.log("🛠️ Updating job:", id, updateData);

    // Update the job
    const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
      new: true, // return updated record
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("❌ Error updating job:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecruiter = await Job.findByIdAndDelete(id);

    if (!deletedRecruiter) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting Job:", error);
    res.status(500).json({ message: "Server Error" });
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
