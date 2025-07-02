import React, { useState } from "react";
import axios from "../api/axios";

const AddRestaurantForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/restaurants", { name, address, cuisineType, image });
      setMessage("Restaurant added!");
      setName(""); setAddress(""); setCuisineType(""); setImage("");
    } catch (err) {
      setMessage("Failed to add restaurant");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h2>Add Restaurant</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Cuisine Type</label>
          <input className="form-control" value={cuisineType} onChange={e => setCuisineType(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input className="form-control" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100" type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddRestaurantForm; 