const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');

router.post('/', auth, orderController.createOrder);
router.get('/my', auth, orderController.getOrdersForUser);
router.get('/owner', auth, owner, orderController.getOrdersForOwner);
router.get('/restaurant/:restaurantId', auth, owner, orderController.getOrdersByRestaurantId);

module.exports = router; 