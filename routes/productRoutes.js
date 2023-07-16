const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');

// create product (admin use only)
router.post('/createProduct', (req, res) => {
	productControllers.productCreation(req.body)
	.then(resultFromController => res.send(resultFromController))
});

// retrive all products(active or not) 
router.post('/allProducts', productControllers.retrieveProducts);

// retrieve all active products
router.post('/activeProducts', productControllers.retrieveActiveProducts);

// retrieve a single product
router.get('/singleProduct', productControllers.retrieveSingleProduct);

// update product information (admin use only)
router.put('/updateProduct', (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;
  productControllers.updateProduct(productId, updatedData)
    .then(updatedProduct => {
      res.send(updatedProduct);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

// archive a product (admin use only)
router.put('/archiveProduct', productControllers.archiveProduct);

// activate a product (admin use only)
router.put('/activateProduct', productControllers.activateProduct);

// user checkout
router.post('/checkout', productControllers.checkout);

module.exports = router;