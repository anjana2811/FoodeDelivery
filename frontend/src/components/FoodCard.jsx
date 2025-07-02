import React from "react";
import "./FoodCard.css";

const FoodCard = ({ food, onAddToCart }) => {
  const handleAdd = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex(item => item._id === food._id);
    if (idx > -1) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    if (onAddToCart) onAddToCart(food);
  };
  return (
    <div className="food-card">
      <img src={food.image || "/default-food.jpg"} alt={food.name} />
      <h5>{food.name}</h5>
      <p>{food.description}</p>
      <p><strong>₹{food.price}</strong></p>
      <button className="btn btn-success" onClick={handleAdd}>Add to Cart</button>
    </div>
  );
};

export default FoodCard; 