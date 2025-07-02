import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/users/profile").then(res => {
      setUser(res.data);
      setUsername(res.data.username);
      setProfilePic(res.data.profilePic || "");
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.put("/users/profile", { username, profilePic });
      setUser(res.data);
      setMessage("Profile updated!");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      setMessage("Update failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h2>Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Username</label>
          <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Profile Picture URL</label>
          <input className="form-control" value={profilePic} onChange={e => setProfilePic(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100" type="submit">Update</button>
      </form>
      {user.profilePic && <img src={user.profilePic} alt="Profile" className="img-thumbnail mt-3" style={{ maxWidth: 150 }} />}
    </div>
  );
};

export default Profile; 