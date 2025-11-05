import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    location.pathname === "/login" || location.pathname === "/register";

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (hideNavbar) return null; // ❌ Don't render navbar on login/register pages

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
