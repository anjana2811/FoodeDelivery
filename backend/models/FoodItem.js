const mongoose = require('mongoose');
const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String, required: true },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }
}, { timestamps: true });
module.exports = mongoose.model('FoodItem', foodItemSchema); 