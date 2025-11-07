import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from "./AdminNavbar"
const FRONTEND_URL = process.env.FRONTEND_URL;

const ApplicationAdmin = () => {
  const [applications, setApplications] = useState([]);

  // ✅ Fetch all applications from backend
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${FRONTEND_URL}/applications/applications`); 
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // ✅ Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${FRONTEND_URL}/applications/applications/${id}`, {
        status: newStatus,
      });
      alert(`Application status updated to ${newStatus}`);
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await axios.delete(`${FRONTEND_URL}/applications/applications/${id}`);
        alert("Application deleted successfully!");
        fetchApplications();
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
  };

  return (
    <div className="container my-5">
        <AdminNavbar/>
      <h2 className="text-center mb-4 fw-bold">Application Dashboard</h2>

      {applications.length === 0 ? (
        <p className="text-center">No applications found.</p>
      ) : (
        <div className="row">
          {applications.map((app) => (
            <div className="col-md-4 mb-4" key={app._id}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">{app.jobId?.title}</h5>
<p className="card-text mb-1">
  <strong>Applicant:</strong> {app.userId?.name || "N/A"}
</p>
<p className="card-text mb-1">
  <strong>Email:</strong> {app.userId?.email || "N/A"}
</p>
<p className="card-text">
  <strong>Resume:</strong>{" "}
  <a href={app.userId?.resumeURL} target="_blank" rel="noreferrer">
    View Resume
  </a>
</p>

                  {/* ✅ Status Update Buttons */}
                  <div className="d-flex justify-content-between mt-3">
                    <select
                      className="form-select form-select-sm w-50"
                      value={app.status}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(app._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationAdmin;
