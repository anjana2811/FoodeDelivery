const FoodItem = require('../models/FoodItem');

exports.createFoodItem = async (req, res) => {
  try {
    const { name, price, restaurantId, description, image, category } = req.body;
    const foodItem = new FoodItem({ name, price, restaurantId, description, image, category });
    await foodItem.save();
    res.status(201).json(foodItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getFoodItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foodItems = await FoodItem.find({ restaurantId });
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, restaurantId, description, image } = req.body;
    const updated = await FoodItem.findByIdAndUpdate(
      id,
      { name, price, restaurantId, description, image },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Food item not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await FoodItem.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Food item not found' });
    res.json({ message: 'Food item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 