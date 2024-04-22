const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

router.get('/products', apiController.getAllProducts);
router.get('/products/:id', apiController.getProductById);
router.post('/products', apiController.createProduct);
router.put('/products/:id', apiController.updateProduct);
router.delete('/products/:id', apiController.deleteProduct);

module.exports = router;