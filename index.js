const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://admin:forthegame123@sandbox.y0vqcrf.mongodb.net/230715?retryWrites=true&w=majority',{
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas - 230715.'))

app.listen(process.env.PORT || 5000, () => { 
	console.log(`Server Running on Localhost: ${ process.env.PORT || 5000}`)
})