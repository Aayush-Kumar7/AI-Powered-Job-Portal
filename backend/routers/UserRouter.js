const express = require("express");
const router = express.Router();
const ApplicationModel = require("../models/Application");

const { Signup } = require("../controller/Signupcontroller");
const {Login} = require("../controller/Logincontroller");
const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to store resumes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// get applications of user
router.get("/applications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await ApplicationModel.find({ userId })
      .populate("jobId", "title location description company")
      .sort({ appliedon: -1 });
//  console.log("Populated Data:", JSON.stringify(applications, null, 2)); 
    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});


// ✅ Handle multipart/form-data using multer
router.post("/signup", upload.single("resume"), Signup);
router.post("/login",Login);

module.exports = router;


