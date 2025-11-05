import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import RecruiterDashboard from "./pages/Recruiterdashboard";
// import Profile from "./pages/Profile";
// import PostJob from "./pages/PostJob";
// import AdminPanel from "./pages/AdminPanel";
// import JobDetails from "./pages/JobDetails";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
           <Route path="/dashboard" element={<AdminDashboard />} />
             <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
          {/* <Route path="/" element={<Home />} />
          
          
         
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/job/:id" element={<JobDetails />} /> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
