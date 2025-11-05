import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  // ✅ Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      // Instead of alert, use redirect-friendly message
      console.warn("User not logged in — redirecting to login page.");
      navigate("/login", { state: { from: "/userdashboard" } });
      return;
    }
  }, [navigate]);

  // ✅ Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/job/alljob");
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // ✅ Apply for a job
  const handleApply = async (jobId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login", { state: { from: "/userdashboard" } });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/applications/apply",
        { userId, jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Job applied successfully!");
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply. You may have already applied.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading jobs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Welcome to Job Portal</h2>
      </div>

      {/* Job List */}
      <div className="row">
        {jobs.length === 0 ? (
          <p className="text-center text-muted">No jobs available right now.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">
                    <strong>Company:</strong> {job.company} <br />
                    <strong>Location:</strong> {job.location} <br />
                    <strong>Salary:</strong> ₹{job.salary}
                  </p>
                  <p className="text-muted">{job.description}</p>

                  <button
                    className="btn btn-primary w-100"
                    disabled={appliedJobs.includes(job._id)}
                    onClick={() => handleApply(job._id)}
                  >
                    {appliedJobs.includes(job._id)
                      ? "Applied ✅"
                      : "Apply Now"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
