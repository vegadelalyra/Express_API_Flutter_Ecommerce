const categoryController = require('../controllers/category.controller');
const productController = require('../controllers/products.controller');
const express = require('express');
const router = express.Router();

router.post('/categories', categoryController.create);
router.get('/categories', categoryController.findAll);
router.get('/categories/:id', categoryController.findOne);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

router.post('/products', productController.create);
router.get('/products', productController.findAll);
router.get('/products/:id', productController.findOne);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

module.exports = router;
