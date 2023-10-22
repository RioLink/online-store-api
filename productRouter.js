const express = require('express');
const router = express.Router();
const productController = require('./productController');

router.get('/api/products', productController.getProducts);
router.get('/api/products/:id', productController.getProductById);
router.post('/api/cart/add', productController.addToCart);
router.post('/api/cart/remove', productController.removeFromCart);

module.exports = router;
