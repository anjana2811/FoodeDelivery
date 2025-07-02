const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, items, totalAmount } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }
    if (!restaurantId || !Array.isArray(items) || !items.length || typeof totalAmount !== 'number') {
      return res.status(400).json({ message: 'Missing or invalid order data' });
    }
    for (const item of items) {
      if (!item.foodItemId || typeof item.quantity !== 'number') {
        return res.status(400).json({ message: 'Invalid item in order' });
      }
    }
    const order = new Order({
      customerId: req.user.id,
      restaurantId,
      items,
      totalAmount,
      status: 'pending'
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getOrdersForUser = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all orders for restaurants owned by the logged-in owner
exports.getOrdersForOwner = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const restaurants = await Restaurant.find({ ownerId });
    const restaurantIds = restaurants.map(r => r._id);
    const orders = await Order.find({ restaurantId: { $in: restaurantIds } }).populate('restaurantId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all orders for a specific restaurant
exports.getOrdersByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const orders = await Order.find({ restaurantId })
      .populate('customerId', 'name email')
      .populate('items.foodItemId', 'name');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 