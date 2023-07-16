// BSCS Source Code 3T AY 2022-2023
/*
	Program: 	 Machine Problem 2
	Programmer:  Emmanuel Jazon C. Remig
	Section: 	 AN22
	Start Date:  July 16, 2023
	End Date: 	 July 18, 2023

*/
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

mongoose.connect('mongodb+srv://admin:forthegame123@sandbox.y0vqcrf.mongodb.net/230715?retryWrites=true&w=majority',{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas - 230715.'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(process.env.PORT || 5000, () => { 
	console.log(`Server Running on Localhost: ${ process.env.PORT || 5000}`)
});