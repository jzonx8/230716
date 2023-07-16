const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')

router.post('/register', (req, res) => {
	userControllers.userRegistration(req.body)
	.then(resultFromController => res.send(resultFromController))
});

router.post('/login', (req, res) => {
	userControllers.userLogin(req.body)
	.then(resultFromController => res.send(resultFromController))
});

module.exports = router;