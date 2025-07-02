const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  location: { type: String, required: true },
  description: { type: String, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema); 