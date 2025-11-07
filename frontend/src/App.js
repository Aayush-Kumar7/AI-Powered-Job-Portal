import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/user/UserDashboard";
import RecruiterDashboard from "./recruiter/Recruiterdashboard";
import AdminuserDashboard from "./pages/admin/Useradmin";
import AdminrecruiterDashboard from "./pages/admin/recruiteradmin";
import AdminJobs from "./pages/admin/JobAdimin";
import HomePage from "./pages/HomePage";
import ApplicationAdmin from "./pages/admin/Applicationadmin";
import ApplicationUser from "./pages/user/ApplicationUser";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="applicationadmin" element={<ApplicationAdmin/>}/>
             <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="applicationuser" element={<ApplicationUser/>}/>
              <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
              <Route path="/adminuserDashboard" element={<AdminuserDashboard/>}/>
           <Route path="/adminrecruiterDashboard" element={<AdminrecruiterDashboard/>}/>      
           <Route path="/adminjobs" element={<AdminJobs/>}/>  
                 
         
      </Routes>
      </div>
    </Router>
  )
};

export default App;
