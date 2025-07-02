const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');

router.post('/', auth, owner, restaurantController.createRestaurant);
router.get('/', restaurantController.getRestaurants);
router.get('/owner', auth, owner, restaurantController.getRestaurantsByOwner);

module.exports = router; 