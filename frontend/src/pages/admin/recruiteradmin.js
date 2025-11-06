import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";

const AdminrecruiterDashboard = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [editingRecruiter, setEditingRecruiter] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  // ✅ Fetch all recruiters when component mounts
  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/recruiters");
      setRecruiters(res.data);
    } catch (error) {
      console.error("Error fetching recruiters:", error);
    }
  };

  // ✅ Handle delete recruiter
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recruiter?")) {
      try {
        await axios.delete(`http://localhost:8000/admin/recruiters/${id}`);
        alert("Recruiter deleted successfully!");
        fetchRecruiters();
      } catch (error) {
        console.error("Error deleting recruiter:", error);
        alert("Failed to delete recruiter.");
      }
    }
  };

  // ✅ Handle edit button click
  const handleEdit = (rec) => {
    setEditingRecruiter(rec._id);
    setFormData({
      name: rec.name,
      email: rec.email,
      company: rec.company || "",
    });
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle update form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/admin/recruiters/${editingRecruiter}`, {
        ...formData,
      });
      alert("Recruiter updated successfully!");
      setEditingRecruiter(null);
      fetchRecruiters();
    } catch (error) {
      console.error("Error updating recruiter:", error);
      alert("Failed to update recruiter.");
    }
  };

  // ✅ Handle cancel edit
  const handleCancel = () => {
    setEditingRecruiter(null);
    setFormData({ name: "", email: "", company: "" });
  };

  return (
    <div className="container mt-5">
        <AdminNavbar/>
      <h2 className="fw-bold text-success mb-4 text-center">
        Admin Dashboard - Manage Recruiters
      </h2>

      {/* ✅ Recruiter Cards Section */}
      {recruiters.length > 0 ? (
        <div className="row">
          {recruiters.map((rec) => (
            <div key={rec._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 border-success">
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">{rec.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Email:</strong> {rec.email}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Company:</strong> {rec.company || "N/A"}
                  </p>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(rec)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(rec._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recruiters found.</p>
      )}

      {/* ✅ Edit Recruiter Form */}
      {editingRecruiter && (
        <div className="card mt-4 shadow">
          <div className="card-header bg-warning text-dark">
            <h5 className="mb-0">Edit Recruiter</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Company:</label>
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Update Recruiter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminrecruiterDashboard;
