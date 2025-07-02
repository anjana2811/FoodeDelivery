const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');

router.post('/', auth, owner, foodController.createFoodItem);
router.get('/restaurant/:restaurantId', foodController.getFoodItemsByRestaurant);
router.put('/:id', auth, owner, foodController.updateFoodItem);
router.delete('/:id', auth, owner, foodController.deleteFoodItem);

module.exports = router; 