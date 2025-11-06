import React from "react";
import { Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";

const AdminNavbar = () => {
 



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        {/* ✅ Left: Brand / Logo */}
        <Link className="navbar-brand fw-bold text-uppercase" to="/admin">
          Admin Dashboard
        </Link>

        {/* ✅ Mobile toggle button */}
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

        {/* ✅ Right: All Links at End */}
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {/* User Management */}
            <li className="nav-item">
              <Link className="nav-link" to="/adminuserDashboard">
                👥 Users
              </Link>
            </li>

            {/* Recruiter Management */}
            <li className="nav-item">
              <Link className="nav-link" to="/adminrecruiterDashboard">
                🏢 Recruiters
              </Link>
            </li>

            {/* Job Management */}
            <li className="nav-item">
              <Link className="nav-link" to="/adminjobs">
                💼 Jobs
              </Link>
            </li>

            {/* Application Management */}
            <li className="nav-item">
              <Link className="nav-link" to="/applicationadmin">
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
