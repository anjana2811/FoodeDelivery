const Restaurant = require('../models/Restaurant');

exports.createRestaurant = async (req, res) => {
  try {
    const { name, location, description, image } = req.body;
    const restaurant = new Restaurant({
      name,
      location,
      description,
      image,
      ownerId: req.user.id
    });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getRestaurantsByOwner = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ ownerId: req.user.id });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 