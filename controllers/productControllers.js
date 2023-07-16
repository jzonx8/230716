const Product = require('../models/product');
const User = require('../models/user')

// create product (admin use only)
module.exports.productCreation = (reqBody) => {
	return User.findOne({ isAdmin: true }).then((result) => {
		if (!result) {
			return { message: "Admin status is required for this action." };
		} else {
			let newProduct = new Product({
				pName: reqBody.pName,
				pDescription: reqBody.pDescription,
				pPrice: reqBody.pPrice,
			});
			return newProduct.save().then((product, error) => {
				if (error) {
					return false;
				} else {
					return {message : "Product created successfully"};
				}
			});
		}
	});
};

// retrive all products(active or not)
module.exports.retrieveProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error in retrieving the products.' });
    });
};

// retrieve all active products
module.exports.retrieveActiveProducts = () => {
  return Product.find({ isActive: true })
    .then((products) => {
      return products;
    })
    .catch((error) => {
      throw error;
    });
};

// retrieve a single product
module.exports.retrieveSingleProduct = (req, res) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Return the product if found
      res.json(product);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'error' });
    });
};

// update product information (admin use only)
module.exports.updateProduct = (req, res) => {
  // Check if the user has admin access
  if (!req.user.isAdmin) {
    return res.status(401).json({ message: 'Admin status is required for this action.' });
  }

  // Extract the product ID and updated data from the request body
  const { productId, ...updatedData } = req.body;

  // Update the product with the provided ID
  Product.findByIdAndUpdate(productId, updatedData, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.json(updatedProduct);
    })
    .catch((error) => {
      res.status(500).json({ message: 'error.', error });
    });
};

// archive a product (admin use only)
module.exports.archiveProduct = (req, res) => {
  const { productId } = req.params;

  Product.findByIdAndUpdate(
    productId,
    { archived: true }, // Set the "archived" field to true
    { new: true } // Return the updated product
  )
    .then(updatedProduct => {
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(updatedProduct);
    })
    .catch(error => {
      res.status(500).json({ message: 'error' });
    });
};

// activate a product (admin use only)
module.exports.activateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Perform authentication and authorization checks to ensure only admins can activate a product

    // Find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product status to activated
    product.isActive = true;

    // Save the updated product
    await product.save();

    return res.json({ message: 'Product activated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'error' });
  }
};

// user checkout
module.exports.checkout = async (req, res) => {
  try {
    // Retrieve the product details from the request body
    const { productId, quantity } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists and has sufficient quantity for checkout
    if (!product || product.quantity < quantity) {
      return res.status(404).json({ error: 'error' });
    }

    // Perform any additional checkout logic here, such as updating the product quantity, creating an order, etc.

    // Return a success message
    res.json({ message: 'Checkout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error' });
  }
};