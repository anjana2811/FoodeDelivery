import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import RestaurantCard from "../components/RestaurantCard";
import "../components/RestaurantCard.css";

const CustomerHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("/restaurants").then(res => {
      setRestaurants(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="customer-home" style={{ padding: '2rem', width: '100%', position:'static', left:'0' }}>
      {user && (
        <div className="welcome-note-upper-right">
          Welcome, {user.name || user.username || user.email}!
        </div>
      )}
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Restaurants</h2>
      {restaurants.map(r => (
        <RestaurantCard key={r._id} restaurant={r} />
      ))}
    </div>
  );
};

export default CustomerHome; 