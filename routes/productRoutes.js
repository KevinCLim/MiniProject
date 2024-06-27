const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', productController.createProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/bulk', productController.createMultipleProducts);
router.get('/', productController.getAllProducts);
router.delete('/bulk', productController.deleteMultipleProducts);

module.exports = router;