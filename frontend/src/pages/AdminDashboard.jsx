import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("/users").then(res => setUsers(res.data));
    axios.get("/restaurants").then(res => setRestaurants(res.data));
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-section">
        <h3>Users</h3>
        <table className="table">
          <thead>
            <tr><th>Username</th><th>Email</th><th>Role</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-section">
        <h3>Restaurants</h3>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Owner</th><th>Address</th></tr>
          </thead>
          <tbody>
            {restaurants.map(r => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.ownerId}</td>
                <td>{r.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard; 