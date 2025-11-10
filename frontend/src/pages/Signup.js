import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Page.css";
const API_URL = process.env.REACT_APP_API_URL;


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    skills: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, password, role, skills, resume } = formData;

      // Convert skills input to array (only if role is user)
      const skillsArray =
        role === "user" ? skills.split(",").map((s) => s.trim()) : [];

      // Create form data for backend (to handle file upload)
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("role", role);
      if (role === "user") {
        formDataToSend.append("skills", JSON.stringify(skillsArray));
        if (resume) formDataToSend.append("resume", resume);
      }

      // Send data
      await axios.post(`${API_URL}/user/signup`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration successful! You can now login.");
      navigate("/login");
    } catch (err) {
      alert("Error registering user. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <div className="card shadow-lg border-0 p-4 register-card">
        <h3 className="text-center mb-4 fw-bold text-primary">
          Create an Account
        </h3>
    

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label fw-semibold">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Show Skills and Resume only if role = user */}
          {formData.role === "user" && (
            <>
              {/* Skills */}
              <div className="mb-3">
                <label htmlFor="skills" className="form-label fw-semibold">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  className="form-control"
                  placeholder="e.g. React, Node.js, Python"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>

              {/* Resume Upload */}
              <div className="mb-3">
                <label htmlFor="resume" className="form-label fw-semibold">
                  Upload Resume (PDF/DOC)
                </label>
                <input
                  type="file"
                  name="resume"
                  id="resume"
                  className="form-control"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* Already have account */}
        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-decoration-none text-primary fw-semibold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
