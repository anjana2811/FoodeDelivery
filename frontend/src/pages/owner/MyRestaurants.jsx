import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RestaurantCard from "../../components/RestaurantCard";

const MyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("/restaurants").then(res => {
      setRestaurants(res.data.filter(r => r.ownerId === user.id));
      setLoading(false);
    });
  }, [user.id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div>
      <h4>My Restaurants</h4>
      <div className="row">
        {restaurants.map(r => (
          <div className="col-md-6" key={r._id}>
            <RestaurantCard restaurant={r} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRestaurants; 