import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      console.log("Submitting:", email, password);

      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      console.log("Server Response:", response.data);

      // Save JWT token and user data in localStorage
localStorage.setItem("token", response.data.token);
localStorage.setItem("userId", response.data.user._id);
localStorage.setItem("role", response.data.user.role);
localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect based on user role
      if (response.data.user.role === "admin") {
        navigate("/adminuserDashboard");
      }else if(response.data.user.role === "recruiter") {
        navigate("/recruiterdashboard");
      }
       else {
        navigate("/userdashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data.msg) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 text-primary">Login</h3>
        {message && (
          <div
            className={`alert ${
              message.includes("successful") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <a href="/register" className="text-primary">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
