import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";


const Home = () => {
  return (
    <div className="homepage">
      {/* Hero Section with image on right */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            {/* Left side - text */}
            <div className="col-md-6">
              <h1 className="display-5 fw-bold">
                Find Your Dream Job with AI
              </h1>
              <p className="lead mt-3">
                Explore personalized job opportunities tailored to your skills and career goals.
              </p>
              <div className="mt-4">
                <Link to="/login" className="btn btn-primary btn-lg fw-bold me-3">
                  Get Started
                </Link>
                <Link to="/register" className="btn btn-outline-primary btn-lg fw-bold">
                  Join Now
                </Link>
              </div>
            </div>

            {/* Right side - image */}
            <div className="col-md-6 text-center">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/online-job-search-5015545-4185620.png"
                alt="Job Search Illustration"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm p-4 border-0 h-100">
                <h5 className="fw-bold">Smart Recommendations</h5>
                <p className="text-muted">
                  Receive AI-driven job suggestions based on your profile and experience.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm p-4 border-0 h-100">
                <h5 className="fw-bold">Quick Applications</h5>
                <p className="text-muted">
                  Apply to multiple jobs seamlessly and track your application status in real-time.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm p-4 border-0 h-100">
                <h5 className="fw-bold">Career Insights</h5>
                <p className="text-muted">
                  Analyze trends and improve your skills using AI-based insights and analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Jobs Placeholder Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 text-primary">Recommended Jobs for You</h2>
          <div className="row">
            {[1, 2, 3].map((job) => (
              <div key={job} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-bold">Frontend Developer</h5>
                      <p className="text-muted mb-1">Tech Solutions Pvt. Ltd.</p>
                      <p className="text-muted mb-2">📍 New Delhi | 💰 ₹6–8 LPA</p>
                      <p className="text-truncate">
                        Build and maintain user interfaces for modern web applications...
                      </p>
                    </div>
                    <Link to="/login" className="btn btn-primary w-100 mt-3">
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">How It Works</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>1️⃣ Create Profile</h5>
              <p className="text-muted">
                Sign up, upload your resume, and provide your skills and preferences.
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>2️⃣ Get Recommendations</h5>
              <p className="text-muted">
                AI analyzes your profile and recommends jobs that best match your skills.
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>3️⃣ Apply & Track</h5>
              <p className="text-muted">
                Apply directly through the portal and monitor your application status.
              </p>
            </div>
          </div>
        </div>
      </section>

 

      {/* Footer */}
      <footer className=" homepagefooter bg-dark text-white text-center py-3">
        <p className="mb-0">
          © {new Date().getFullYear()} AI-Powered Job Portal. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
