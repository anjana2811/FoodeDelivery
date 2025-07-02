import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-bg">
      <div className="home-content">
        <h1>Welcome to Food Zone</h1>
        <p className="home-subtitle">Order delicious food from your favorite restaurants, delivered fast to your door.</p>
        <button className="order-btn" onClick={() => navigate("/login")}>Order Now</button>
      </div>
    </div>
  );
};

export default Home; 