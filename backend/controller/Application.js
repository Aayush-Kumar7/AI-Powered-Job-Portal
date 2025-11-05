const ApplicationModel = require('../models/Application');
const JobModel = require('../models/Job');
const UserModel = require('../models/User');

// ✅ Apply for a job
const applyJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({ message: "userId and jobId are required." });
    }

    // Prevent duplicate applications
    const existing = await ApplicationModel.findOne({ userId, jobId });
    if (existing) {
      return res.status(400).json({ message: "Already applied for this job." });
    }

    const application = new ApplicationModel({ userId, jobId });
    await application.save();

    res.status(201).json({
      message: "Job application submitted successfully!",
      application,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all applications (Admin)
const getAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationModel.find()
      .populate("userId", "name email")   // optional
      .populate("jobId", "title company location salary");

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get applications by user
const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await ApplicationModel.find({ userId })
      .populate('jobId', 'title companyName location');

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get applications for a specific job (Recruiter)
const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await ApplicationModel.find({ jobId })
      .populate('userId', 'name email');

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update application status (Recruiter/Admin)
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['applied', 'interviewing', 'offered', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const application = await ApplicationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) return res.status(404).json({ message: "Application not found." });

    res.status(200).json({ message: "Status updated successfully!", application });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {applyJob,getAllApplications, getUserApplications,getJobApplications,updateStatus}