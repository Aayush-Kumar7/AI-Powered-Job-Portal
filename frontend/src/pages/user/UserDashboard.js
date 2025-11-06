import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserNavbar from "./Usernavbar";

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
      console.warn("User not logged in — redirecting to login page.");
      navigate("/", { state: { from: "/userdashboard" } });
      return;
    }
  }, [navigate]);

  // ✅ Fetch all jobs and user's applied jobs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // 1️⃣ Fetch all jobs
        const jobsRes = await axios.get("http://localhost:8000/job/alljob");
        setJobs(jobsRes.data.jobs || []);

        // 2️⃣ Fetch user's applied jobs
        const applicationsRes = await axios.get(
          `http://localhost:8000/applications/applications/${userId}`
        );

        const appliedJobIds = applicationsRes.data.map(
          (app) => app.jobId?._id // optional chaining in case of null
        );
        setAppliedJobs(appliedJobIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Apply for a job
  const handleApply = async (jobId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/", { state: { from: "/userdashboard" } });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/applications/apply",
        { userId, jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Job applied successfully!");
      // Add the applied job to the state to disable button
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(
        error.response?.data?.message || "Failed to apply. You may have already applied."
      );
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
      <UserNavbar />

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
                    {appliedJobs.includes(job._id) ? "Applied ✅" : "Apply Now"}
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
