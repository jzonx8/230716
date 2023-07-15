const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
	pName : {
		type : String
	},
	pDescription : {
		type : String
	},
	pPrice : {
		type : Number
	},
	isActive : {
		type : Boolean,
		default : true
	}
})