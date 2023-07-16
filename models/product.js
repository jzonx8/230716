const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
	pName : {
		type : String,
		required : [true, "Name of the product is required"]
	},
	pDescription : {
		type : String,
		required : [true, "Description is required"]
	},
	pPrice : {
		type : Number,
		required : [true, "Price is required"]
	},
	isActive : {
		type : Boolean,
		default : true
	},
	pCreatedOn : {
		type : Date
	},
	userOrders : [
		{
			userId : {
				type : Object,
				required : [true, "Product User ID is required"]
			},
			orderId : {
				type : String
			}
		}	
	]
});

module.exports = mongoose.model("Product", productSchema);