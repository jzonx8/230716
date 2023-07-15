const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	email : {
		type : String,
		required : [true, "email is required"]
	},
	password : {
		type : String,
		required : [true, "password is required"]
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	totalAmount : {
		type : Number
	},
	purchasedOn : {
		type : Date
	},
	orderedProduct : [
		{
			productArray : {
				type : Array
			},
			productId : {
				type : ObjectId
			},
			productName : {
				type : String,
				required : [true, "Name of the product is required"]
			},
			quantity : {
				type : Number
			}
		}]
})