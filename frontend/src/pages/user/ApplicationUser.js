import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import UserNavbar from "./Usernavbar";

const ApplicationUser = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchUserApplications();
  }, []);

  const fetchUserApplications = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.warn("⚠️ No userId found in localStorage!");
        return;
      }

      const res = await axios.get(
        `http://localhost:8000/user/applications/${userId}`
      );
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching user applications:", error);
    }
  };

  return (
    <div className="container mt-5">
        <UserNavbar/>
      <h2 className="text-center mb-4 text-primary">My Applications</h2>

      {applications.length === 0 ? (
        <div className="text-center text-muted">No applications found.</div>
      ) : (
        <div className="row">
          {applications.map((app, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-dark">
                    {app.jobId?.title || "Untitled Job"}
                  </h5>
                  <p className="card-text text-muted mb-1">
                    <strong>Location:</strong> {app.jobId?.location || "N/A"}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        app.status === "rejected"
                          ? "bg-danger"
                          : app.status === "offered"
                          ? "bg-success"
                          : app.status === "interviewing"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {app.status}
                    </span>
                  </p>
                  <p className="card-text text-muted">
                    Applied on:{" "}
                    {new Date(app.appliedon).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationUser;
