import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Redirect based on role
      const role = res.data.user.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "owner") {
        navigate("/owner");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="centered-form-wrapper">
      <div className="login-form-box">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login; 