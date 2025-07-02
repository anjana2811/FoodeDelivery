import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const AddFoodForm = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/restaurants").then(res => setRestaurants(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/foods", { name, price, restaurantId, description, image, category });
      setMessage("Food item added!");
      setName(""); setPrice(""); setDescription(""); setImage(""); setCategory("");
    } catch (err) {
      setMessage("Failed to add food item");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h2>Add Food Item</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Restaurant</label>
          <select className="form-select" value={restaurantId} onChange={e => setRestaurantId(e.target.value)} required>
            <option value="">Select Restaurant</option>
            {restaurants.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input className="form-control" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input className="form-control" value={category} onChange={e => setCategory(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100" type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddFoodForm; 