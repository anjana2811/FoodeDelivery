import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => (
  <div className="restaurant-card">
    <img src={restaurant.image || "/default-restaurant.jpg"} alt={restaurant.name} />
    <h5>{restaurant.name}</h5>
    <p>{restaurant.cuisineType}</p>
    <p style={{ color: '#888', fontSize: '0.95em' }}>{restaurant.address}</p>
    <Link to={`/foods/${restaurant._id}`} className="btn btn-primary btn-sm">View Menu</Link>
  </div>
);

export default RestaurantCard; 