import React, { useEffect, useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  

  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // ✅ Fetch all data on page load
  useEffect(() => {
    fetchUsers();
    fetchRecruiters();
    fetchJobs();
    fetchApplications();
  }, []);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // ✅ Fetch all recruiters
  const fetchRecruiters = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/recruiters");
      setRecruiters(res.data);
    } catch (err) {
      console.error("Error fetching recruiters:", err);
    }
  };

  // ✅ Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // ✅ Fetch all applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:8000/applications/all");
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  // ✅ Logout


  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Admin Dashboard</h2>

      </div>

      {/* All Users */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">All Users</h5>
        </div>
        <div className="card-body">
          {users.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{(user.skills || []).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>

      {/* All Recruiters */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">All Recruiters</h5>
        </div>
        <div className="card-body">
          {recruiters.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((rec) => (
                  <tr key={rec._id}>
                    <td>{rec.name}</td>
                    <td>{rec.email}</td>
                    <td>{rec.company || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No recruiters found.</p>
          )}
        </div>
      </div>

      {/* All Jobs */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">All Jobs</h5>
        </div>
        <div className="card-body">
          {jobs.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Posted By</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>{job.recruiterName || "Unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>

      {/* All Applications */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-warning text-dark">
          <h5 className="mb-0">All Applications</h5>
        </div>
        <div className="card-body">
          {applications.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Job Title</th>
                  
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.userId}</td>
                {/* <td>{app.userEmail}</td> */}
                <td>{app.jobTitle}</td>
                {/* <td>{app.company}</td> */}
                    <td>{app.status || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
