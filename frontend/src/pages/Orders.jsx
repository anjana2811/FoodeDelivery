import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/orders/my").then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.status}</td>
                <td>₹{order.totalAmount}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders; 