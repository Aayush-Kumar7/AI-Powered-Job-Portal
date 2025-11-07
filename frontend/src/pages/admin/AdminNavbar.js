import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ important for mobile toggle
import "./admin.css";

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Left side: Brand / Logo */}
        <Link className="navbar-brand fw-bold text-uppercase" to="/admin">
          Admin Dashboard
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center text-center text-lg-start">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/adminuserDashboard">
                👥 Users
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/adminrecruiterDashboard">
                🏢 Recruiters
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/adminjobs">
                💼 Jobs
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/applicationadmin">
                📄 Applications
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
