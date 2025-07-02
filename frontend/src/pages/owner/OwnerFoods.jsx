import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import "../OwnerDashboard.css";

const OwnerFoods = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [showAddFood, setShowAddFood] = useState(false);
  const [newFood, setNewFood] = useState({ name: "", price: "", description: "", image: "" });
  const [foodImagePreview, setFoodImagePreview] = useState(null);
  const [editFoodId, setEditFoodId] = useState(null);
  const [editFoodData, setEditFoodData] = useState({ name: "", price: "", description: "", image: "" });
  const [editFoodImagePreview, setEditFoodImagePreview] = useState(null);

  useEffect(() => {
    fetchRestaurant();
    fetchFoods();
  }, [restaurantId]);

  const fetchRestaurant = async () => {
    const res = await axios.get(`/restaurants`);
    const found = res.data.find(r => r._id === restaurantId);
    setRestaurant(found);
  };

  const fetchFoods = async () => {
    const res = await axios.get(`/food/restaurant/${restaurantId}`);
    setFoods(res.data);
    setShowAddFood(false);
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

  const handleAddFood = async (e) => {
    e.preventDefault();
    await axios.post(`/food`, { ...newFood, restaurantId });
    setShowAddFood(false);
    setNewFood({ name: "", price: "", description: "", image: "" });
    setFoodImagePreview(null);
    fetchFoods();
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
    fetchFoods();
  };

  const cancelEditFood = () => {
    setEditFoodId(null);
    setEditFoodData({ name: "", price: "", description: "", image: "" });
    setEditFoodImagePreview(null);
  };

  const handleDeleteFood = async (foodId) => {
    await axios.delete(`/food/${foodId}`);
    fetchFoods();
  };

  return (
    <div className="owner-foods-flex-container">
      {/* Left: Restaurant Details */}
      <div className="owner-foods-left">
        {restaurant && (
          <div className="selected-restaurant-details">
            <h3>Restaurant Details</h3>
            {restaurant.image && <img src={restaurant.image} alt={restaurant.name} style={{ width:300, height:300, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }} />}
            <h4>{restaurant.name}</h4>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p><strong>Description:</strong> {restaurant.description}</p>
          </div>
        )}
      </div>
      {/* Right: Food Items */}
      <div className="owner-foods-right">
        <h3>Foods in Restaurant</h3>
        {foods.length === 0 ? (
          <div style={{ marginTop: 20 }}>
            <p>No food items found for this restaurant.</p>
          </div>
        ) : (
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
        )}
        {/* Add Food Button below the list, always visible */}
        <div className="owner-foods-add-btn-row">
          <button className="dashboard-btn" onClick={() => setShowAddFood(true)}>Add Food Item</button>
        </div>
        {showAddFood && (
          <form className="add-food-form" onSubmit={handleAddFood}>
            <input type="text" placeholder="Food Name" value={newFood.name} onChange={e => setNewFood({ ...newFood, name: e.target.value })} required />
            <input type="number" placeholder="Price" value={newFood.price} onChange={e => setNewFood({ ...newFood, price: e.target.value })} required />
            <input type="text" placeholder="Description" value={newFood.description} onChange={e => setNewFood({ ...newFood, description: e.target.value })} required />
            <input type="file" accept="image/*" onChange={handleFoodImageChange} />
            {foodImagePreview && <img src={foodImagePreview} alt="Preview" className="food-image-large" />}
            <button type="submit">Add</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OwnerFoods; 