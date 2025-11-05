const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const Signup = async (req, res) => {
  try {
    // When using multer, form fields come from req.body
    // Uploaded file info comes from req.file
    const { name, email, password, role, skills } = req.body;

    // Parse skills array if provided
    let skillsArray = [];
    if (skills) {
      try {
        skillsArray = JSON.parse(skills);
      } catch {
        skillsArray = [];
      }
    }

    // Check if user already exists
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // If role is user, add skills and resume file path
    if (role === "user") {
      newUser.skills = skillsArray;
      if (req.file) {
        newUser.resume = req.file.path;
      }
    }

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { Signup };
