import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";


const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  // ✅ Fetch all jobs on page load
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // ✅ Handle delete job
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:8000/admin/jobs/${id}`);
        alert("Job deleted successfully!");
        fetchJobs();
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job.");
      }
    }
  };

  // ✅ Handle edit job
  const handleEdit = (job) => {
    setEditingJob(job._id);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary || "",
      description: job.description || "",
    });
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle update job
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/admin/jobs/${editingJob}`, formData);
      alert("Job updated successfully!");
      setEditingJob(null);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job.");
    }
  };

  // ✅ Handle cancel
  const handleCancel = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });
  };

  return (
    <div className="container mt-5">
        <AdminNavbar/>
      <h2 className="fw-bold text-primary text-center mb-4">
        Admin Dashboard – Manage Jobs
      </h2>

      {/*  Show all jobs as cards */}
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="col-md-4 mb-4" key={job._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {job.company}
                  </h6>
                  <p className="card-text">
                    <strong>Location:</strong> {job.location}
                    <br />
                    <strong>Salary:</strong> ₹{job.salary || "Not specified"}
                    <br />
                    <strong>Description:</strong>{" "}
                    {job.description || "No description available."}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(job)}
                  >
                     Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(job._id)}
                  >
                     Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No jobs found.</p>
        )}
      </div>

      {/* ✅ Edit Job Form */}
      {editingJob && (
        <div className="card mt-4 shadow">
          <div className="card-header bg-warning text-dark">
            <h5 className="mb-0">Edit Job Details</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Title:</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Company:</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Location:</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Salary:</label>
                  <input
                    type="text"
                    name="salary"
                    className="form-control"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
