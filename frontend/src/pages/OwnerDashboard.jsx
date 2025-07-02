import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./OwnerDashboard.css";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const owner = JSON.parse(localStorage.getItem("user"));
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedRestaurantDetails, setSelectedRestaurantDetails] = useState(null);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [showAddFood, setShowAddFood] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({ name: "", location: "", description: "", image: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [newFood, setNewFood] = useState({ name: "", price: "", description: "", image: "" });
  const [foodImagePreview, setFoodImagePreview] = useState(null);
  const [addError, setAddError] = useState("");
  const [editFoodId, setEditFoodId] = useState(null);
  const [editFoodData, setEditFoodData] = useState({ name: "", price: "", description: "", image: "" });
  const [editFoodImagePreview, setEditFoodImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const res = await axios.get("/restaurants/owner");
    setRestaurants(res.data);
  };

  const fetchFoods = async (restaurantId) => {
    setSelectedRestaurant(restaurantId);
    const res = await axios.get(`/food/restaurant/${restaurantId}`);
    setFoods(res.data);
    setShowAddFood(false);
    // Set selected restaurant details
    const restaurant = restaurants.find(r => r._id === restaurantId);
    setSelectedRestaurantDetails(restaurant);
  };

  const fetchOrders = async (restaurantId) => {
    const res = await axios.get(`/orders/restaurant/${restaurantId}`);
    setOrders(res.data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRestaurant({ ...newRestaurant, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFoodImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFood({ ...newFood, image: reader.result });
        setFoodImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    setAddError("");
    try {
      await axios.post("/restaurants", { ...newRestaurant, ownerId: owner._id });
      setShowAddRestaurant(false);
      setNewRestaurant({ name: "", location: "", description: "", image: "" });
      setImagePreview(null);
      fetchRestaurants();
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to add restaurant");
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    await axios.post(`/food`, { ...newFood, restaurantId: selectedRestaurant });
    setShowAddFood(false);
    setNewFood({ name: "", price: "", description: "", image: "" });
    setFoodImagePreview(null);
    fetchFoods(selectedRestaurant);
  };

  const startEditFood = (food) => {
    setEditFoodId(food._id);
    setEditFoodData({
      name: food.name,
      price: food.price,
      description: food.description,
      image: food.image || ""
    });
    setEditFoodImagePreview(food.image || null);
  };

  const handleEditFoodImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFoodData({ ...editFoodData, image: reader.result });
        setEditFoodImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitEditFood = async (e) => {
    e.preventDefault();
    await axios.put(`/food/${editFoodId}`, editFoodData);
    setEditFoodId(null);
    setEditFoodData({ name: "", price: "", description: "", image: "" });
    setEditFoodImagePreview(null);
    fetchFoods(selectedRestaurant);
  };

  const cancelEditFood = () => {
    setEditFoodId(null);
    setEditFoodData({ name: "", price: "", description: "", image: "" });
    setEditFoodImagePreview(null);
  };

  const handleDeleteFood = async (foodId) => {
    await axios.delete(`/food/${foodId}`);
    fetchFoods(selectedRestaurant);
  };

  return (
    <div className="owner-dashboard">
      <div className="owner-details">
        <h2>Welcome, {owner?.name || owner?.username || owner?.email}</h2>
        <p>Email: {owner?.email}</p>
      </div>
      <div className="dashboard-actions">
        <button onClick={() => setShowAddRestaurant(!showAddRestaurant)} className="dashboard-btn">Add Restaurant</button>
      </div>
      {showAddRestaurant && (
        <form className="add-restaurant-form" onSubmit={handleAddRestaurant}>
          <input type="text" placeholder="Restaurant Name" value={newRestaurant.name} onChange={e => setNewRestaurant({ ...newRestaurant, name: e.target.value })} required />
          <input type="text" placeholder="Location" value={newRestaurant.location} onChange={e => setNewRestaurant({ ...newRestaurant, location: e.target.value })} required />
          <input type="text" placeholder="Description" value={newRestaurant.description} onChange={e => setNewRestaurant({ ...newRestaurant, description: e.target.value })} required />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />}
          {addError && <div className="form-error">{addError}</div>}
          <button type="submit">Add</button>
        </form>
      )}
      <h3>Your Restaurants</h3>
      <div className="owner-restaurants-list">
        {restaurants.map(r => (
          <div key={r._id} className="owner-restaurant-card">
            <h4>{r.name}</h4>
            {r.image && <img src={r.image} alt={r.name} className="restaurant-card-img" />}
            <p>{r.location}</p>
            <p>{r.description}</p>
            <div className="card-btn-group">
              <button onClick={() => navigate(`/owner/foods/${r._id}`)} className="dashboard-btn small">Manage Foods</button>
              <button onClick={() => navigate(`/owner/orders/${r._id}`)} className="dashboard-btn small">View Orders</button>
            </div>
          </div>
        ))}
      </div>
      {selectedRestaurant && selectedRestaurantDetails && (
        <div className="owner-foods-section">
          <div className="selected-restaurant-details">
            <h3>Restaurant Details</h3>
            {selectedRestaurantDetails.image && <img src={selectedRestaurantDetails.image} alt={selectedRestaurantDetails.name} style={{ width:70, height:300, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }} />}
            <h4>{selectedRestaurantDetails.name}</h4>
            <p><strong>Location:</strong> {selectedRestaurantDetails.location}</p>
            <p><strong>Description:</strong> {selectedRestaurantDetails.description}</p>
          </div>
          <h3>Foods in Restaurant</h3>
          {foods.length === 0 ? (
            <div style={{ marginTop: 20 }}>
              <p>No food items found for this restaurant.</p>
              <button className="dashboard-btn" onClick={() => setShowAddFood(true)}>Add your first food item</button>
            </div>
          ) : (
            <>
              <button onClick={() => setShowAddFood(!showAddFood)} className="dashboard-btn">Add Food Item</button>
              <div className="owner-foods-list">
                {foods.map(food => (
                  <div key={food._id} className="owner-food-card enhanced-food-card">
                    {editFoodId === food._id ? (
                      <form onSubmit={submitEditFood} className="edit-food-form">
                        <input type="text" value={editFoodData.name} onChange={e => setEditFoodData({ ...editFoodData, name: e.target.value })} required />
                        <input type="number" value={editFoodData.price} onChange={e => setEditFoodData({ ...editFoodData, price: e.target.value })} required />
                        <input type="text" value={editFoodData.description} onChange={e => setEditFoodData({ ...editFoodData, description: e.target.value })} required />
                        <input type="file" accept="image/*" onChange={handleEditFoodImageChange} />
                        {editFoodImagePreview && <img src={editFoodImagePreview} alt="Preview" className="food-image-large" />}
                        <div className="card-btn-row">
                          <button type="submit" className="dashboard-btn card-btn left-btn">Save</button>
                          <button type="button" className="dashboard-btn delete card-btn right-btn" onClick={cancelEditFood}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        {food.image && <img src={food.image} alt={food.name} className="food-image-large" />}
                        <h5>{food.name}</h5>
                        <p className="food-price">₹{food.price}</p>
                        <p className="food-desc">{food.description}</p>
                        <div className="card-btn-row">
                          <button onClick={() => startEditFood(food)} className="dashboard-btn card-btn left-btn">Edit</button>
                          <button onClick={() => handleDeleteFood(food._id)} className="dashboard-btn delete card-btn right-btn">Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {showAddFood && (
            <form className="add-food-form" onSubmit={handleAddFood}>
              <input type="text" placeholder="Food Name" value={newFood.name} onChange={e => setNewFood({ ...newFood, name: e.target.value })} required />
              <input type="number" placeholder="Price" value={newFood.price} onChange={e => setNewFood({ ...newFood, price: e.target.value })} required />
              <input type="text" placeholder="Description" value={newFood.description} onChange={e => setNewFood({ ...newFood, description: e.target.value })} required />
              <input type="file" accept="image/*" onChange={handleFoodImageChange} />
              {foodImagePreview && <img src={foodImagePreview} alt="Preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />}
              <button type="submit">Add</button>
            </form>
          )}
        </div>
      )}
      {orders.length > 0 && (
        <div className="owner-orders-section">
          <h3>Orders for Restaurant</h3>
          <div className="owner-orders-list">
            {orders.map(order => (
              <div key={order._id} className="owner-order-card">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Customer:</strong> {order.user?.name || order.user?.email}</p>
                <p><strong>Items:</strong> {order.items.map(i => `${i.food.name} x${i.quantity}`).join(", ")}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard; 