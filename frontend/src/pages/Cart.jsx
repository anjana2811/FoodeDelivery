import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleQuantity = (index, delta) => {
    setCart(cart => {
      const updated = cart.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemove = (idx) => {
    const newCart = cart.filter((_, i) => i !== idx);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleOrder = async () => {
    if (!cart.length) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to place an order.");
      return;
    }
    const { restaurantId } = cart[0];
    const items = cart.map(item => ({ foodItemId: item._id, quantity: item.quantity }));
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    try {
      await axios.post("/orders", { restaurantId, items, totalAmount });
      setMessage("Order placed successfully!");
      setCart([]);
      localStorage.removeItem("cart");
    } catch (err) {
      setMessage(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-list">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item">
                  <img src={item.image || "/default-food.jpg"} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">₹{item.price}</span>
                    <div className="cart-qty-controls">
                      <button onClick={() => handleQuantity(idx, -1)} className="qty-btn">-</button>
                      <span className="cart-item-qty">{item.quantity}</span>
                      <button onClick={() => handleQuantity(idx, 1)} className="qty-btn">+</button>
                    </div>
                    <span className="cart-item-total">Total: ₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button className="btn btn-danger btn-sm cart-remove-btn" onClick={() => handleRemove(idx)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-actions">
            <div className="cart-total-box">
              <span className="cart-total-label">Cart Total:</span>
              <span className="cart-total-value">₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <button className="place-order-btn" onClick={handleOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 