const express = require("express") ;
const Application = require("../models/Application"); // <-- Your Mongoose model
const JobModel = require("../models/Job");
const router = express.Router();

/**
 * ✅ GET /admin/applications
 * Fetch all job applications
 */
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("userId", "name email resumeURL")  // ✅ populate user details
      .populate("jobId", "title location company") // optional: job info
      .sort({ appliedon: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ PUT /admin/applications/:id
 * Update application status
 */
router.put("/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedApp = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Status updated successfully", updatedApp });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ DELETE /admin/applications/:id
 * Delete an application
 */
router.delete("/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedApp = await Application.findByIdAndDelete(id);
    if (!deletedApp) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/apply", async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({ message: "userId and jobId are required" });
    }

    // Check if job exists
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user already applied for this job
    const existingApp = await Application.findOne({ userId, jobId });
    if (existingApp) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = new Application({
      userId,
      jobId,
      status: "applied", // default
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully!", application });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
