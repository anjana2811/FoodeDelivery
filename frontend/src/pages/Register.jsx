import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./Login.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/auth/register", { email, password, username, role });
      if (role === "owner") {
        navigate("/owner");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="centered-form-wrapper">
      <div className="container mt-5" style={{ maxWidth: 400 }}>
        <h2>Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Role</label>
            <select className="form-control" value={role} onChange={e => setRole(e.target.value)} required>
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <button className="btn btn-primary w-100" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register; 