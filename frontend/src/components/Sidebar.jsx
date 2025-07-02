import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {user && user.role === "customer" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">My Orders</Link>
              </li>
            </>
          )}
          {user && user.role === "owner" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/owner">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-restaurant">Add Restaurant</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-food">Add Food</Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar; 