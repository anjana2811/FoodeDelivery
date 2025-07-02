import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import "../OwnerDashboard.css";

const OwnerOrders = () => {
  const { restaurantId } = useParams();
  const [orders, setOrders] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchRestaurant();
  }, [restaurantId]);

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders for restaurantId:', restaurantId);
      const res = await axios.get(`/orders/restaurant/${restaurantId}`);
      setOrders(res.data);
      setError("");
    } catch (err) {
      setOrders([]);
      setError("No orders found for this restaurant or restaurant does not exist.");
      console.error('Error fetching orders:', err);
    }
  };

  const fetchRestaurant = async () => {
    try {
      const res = await axios.get(`/restaurants`);
      const found = res.data.find(r => r._id === restaurantId);
      setRestaurant(found);
      if (!found) setError("Restaurant not found.");
    } catch (err) {
      setRestaurant(null);
      setError("Error fetching restaurant details.");
      console.error('Error fetching restaurant:', err);
    }
  };

  return (
    <div className="owner-orders-page">
      {error && <div className="alert alert-danger">{error}</div>}
      {restaurant && (
        <div className="selected-restaurant-details">
          <h3>Orders for {restaurant.name}</h3>
          {restaurant.image && <img src={restaurant.image} alt={restaurant.name} style={{ width:200, height:200, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }} />}
          <p><strong>Location:</strong> {restaurant.location}</p>
          <p><strong>Description:</strong> {restaurant.description}</p>
        </div>
      )}
      <div className="owner-orders-list">
        {orders.length === 0 ? (
          <p>No orders found for this restaurant.</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="owner-order-card">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Customer:</strong> {order.customerId?.name || order.customerId?.email}</p>
              <p><strong>Items:</strong> {order.items.map(i => `${i.foodItemId?.name || 'Food'} x${i.quantity}`).join(", ")}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerOrders; 