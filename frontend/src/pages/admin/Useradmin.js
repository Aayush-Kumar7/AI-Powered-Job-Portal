import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import AdminNavbar from "./AdminNavbar";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
  });

  // ✅ Fetch all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ Handle delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8000/admin/users/${id}`);
        alert("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  // ✅ Handle edit button click
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      skills: (user.skills || []).join(", "),
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
      await axios.put(`http://localhost:8000/admin/users/${editingUser}`, {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()), // convert string back to array
      });
      alert("User updated successfully!");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  // ✅ Handle cancel edit
  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", skills: "" });
  };

  return (
    <div className="container mt-5">
        <AdminNavbar/>
      <h2 className="fw-bold text-primary mb-4 text-center">
        Admin Dashboard - Manage Users
      </h2>

      {/* ✅ USER CARDS SECTION */}
      {users.length > 0 ? (
        <div className="row">
          {users.map((user) => (
            <div key={user._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">{user.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Skills:</strong>{" "}
                    {(user.skills || []).length > 0
                      ? user.skills.join(", ")
                      : "No skills listed"}
                  </p>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(user)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user._id)}
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
        <p>No users found.</p>
      )}

      {/* ✅ Edit User Form */}
      {editingUser && (
        <div className="card mt-4 shadow">
          <div className="card-header bg-warning text-dark">
            <h5 className="mb-0">Edit User</h5>
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
                <label className="form-label">Skills (comma-separated):</label>
                <input
                  type="text"
                  name="skills"
                  className="form-control"
                  value={formData.skills}
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
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
