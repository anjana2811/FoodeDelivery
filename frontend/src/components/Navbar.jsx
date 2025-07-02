import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Food Zone</Link>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <>
            <li className={location.pathname === "/login" ? "active" : ""}>
              <Link to="/login">Login</Link>
            </li>
            <li className={location.pathname === "/register" ? "active" : ""}>
              <Link to="/register">Sign Up</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button className="navbar-logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar; 