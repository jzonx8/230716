const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth')

// registration
module.exports.userRegistration = (reqBody) => {
	let newUser = new User ({
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10)
	});

	return newUser.save().then((user, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	});
};
// authentication
module.exports.userLogin = (reqBody) => {
	return User.findOne({email : reqBody.email}).then(result => {
		if(result == null){
			return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			if(isPasswordCorrect){
				return { access : auth.createAccessToken(result)}
			} else {
				return false;
			}
		}
	})
}
// Create product (Admin)
// Retrieve all products
// Retrieve all products
// Retrieve single product
// Update product info (Admin)
// Archive product (Admin)
// Activate product (Admin)
// Non-admin user checkout (create order)
// retrieve user details

// Set user as admin (Admin)
// retrieve authenticated user's order
/* add to cart
	added products, change product quantities, remove products, subtotal, total price
*/