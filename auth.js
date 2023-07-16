// this file store the methods for creaating jsonwbtokens
const jwt = require('jsonwebtoken');
const secret = 'bcsAN22';

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};
	// Generate a JSON web token using the jwt's sign method
	// Generate the token using the form data and the secret code
	return jwt.sign(data, secret, {})
};

module.exports.verify = (req, res, next) => {
	module.exports.decode = (token) => {
		//token received and is not undefined
		if(typeof token !== 'undefined'){
			//retrieves only the token and retrieves and removes the "bearer prefix"

			token = token.slice(7, token.length)
			return jwt.verify(token, secret, (err, data) => {
				if(err){
					return null;
				} else {
					//the decode method is used to obtain the information
					return jwt.decode(token, {complete: true}).payload;
				}
			})
		} else {
			return null;
		}
	}
}