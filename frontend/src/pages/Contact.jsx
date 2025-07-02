import React, { useState } from "react";
import axios from "../api/axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo("");
    try {
      await axios.post("/contact", { name, email, message });
      setInfo("Message sent!");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setInfo("Failed to send message");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h2>Contact Us</h2>
      {info && <div className="alert alert-info">{info}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Message</label>
          <textarea className="form-control" value={message} onChange={e => setMessage(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-100" type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact; 