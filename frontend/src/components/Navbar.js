import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // ✅ Hide navbar on login/register pages
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (hideNavbar){
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* App Name (Left Side) */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
        <i className="bi bi-briefcase-fill me-2"></i>
          AI Job Portal
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links (Right Side) */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white mx-2" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white mx-2" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white mx-2" to="/register">Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  }  // ❌ Don't render navbar on login/register pages

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-sm">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <a className="navbar-brand fw-bold text-light" href="/">
          <i className="bi bi-briefcase-fill me-2"></i>
          AI Job Portal
        </a>

        {/* Right Side: Show only if logged in */}
        {isLoggedIn && user && (
          <div className="d-flex align-items-center ms-auto">
            {/* Profile Photo */}
            <img
              src={
                user.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile"
              className="rounded-circle border border-light me-2"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />

            {/* Username */}
            <span className="text-light fw-semibold me-3">
              {user.name || "User"}
            </span>

            {/* Logout Button */}
            <button
              className="btn btn-light btn-sm fw-semibold"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
