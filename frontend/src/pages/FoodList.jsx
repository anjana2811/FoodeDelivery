import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import FoodCard from "../components/FoodCard";
import "./FoodList.css";

const FoodList = () => {
  const { restaurantId } = useParams();
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/food/restaurant/${restaurantId}`)
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, [restaurantId]);

  const handleAddToCart = (food) => {
    // Add to cart logic (localStorage or context)
    // Then navigate to cart
    // For now, just navigate
    navigate("/cart");
  };

  return (
    <div className="food-list">
      <h2>Menu</h2>
      <div className="food-cards">
        {foods.map(food => (
          <FoodCard key={food._id} food={food} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default FoodList; 