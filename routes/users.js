const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST route to handle user signup
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports = router;