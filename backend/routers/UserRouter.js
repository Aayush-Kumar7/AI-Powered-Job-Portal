const express = require("express");
const router = express.Router();
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

// ✅ Handle multipart/form-data using multer
router.post("/signup", upload.single("resume"), Signup);
router.post("/login",Login);
module.exports = router;


