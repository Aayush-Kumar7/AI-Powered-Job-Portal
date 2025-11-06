import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all applications when page loads
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:8000/application/all");
      setApplications(res.data.applications || []);

    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // Handle input change in create job form
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Create new job
  const handleCreateJob = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const recruiterId = user?._id;

    if (!recruiterId) {
      alert("Please login as recruiter first!");
      navigate("/");
      return;
    }

    const res = await axios.post("http://localhost:8000/job/newjob", {
      ...jobData,
      recruiterId,
    });

    alert(res.data.message || "Job created successfully!");
    setJobData({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });
  } catch (error) {
    console.error("Error creating job:", error);
    alert(error.response?.data?.message || "Failed to create job");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Recruiter Dashboard</h2>
 
      </div>

      {/* Create Job Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Create New Job</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleCreateJob}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Salary (₹)</label>
                <input
                  type="number"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Job"}
            </button>
          </form>
        </div>
      </div>
      </div>
  );
};

export default RecruiterDashboard;
