// controllers/userController.js
const User = require('../models/User');  // Assuming User model is set up correctly
const bcrypt = require('bcryptjs');  // Ensure bcryptjs is required

exports.signUp = async (req, res) => {
  const { username, email, phno, gender, password } = req.body;

  if (!username || !email || !phno || !gender || !password) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      // Create a new user
      const newUser = new User({
          username,
          email,
          phno,
          gender,
          password: hashedPassword, // Save the hashed password, not the plain text
      });

      await newUser.save();

      // Send a success response
      return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      console.error('Error signing up user:', error);

      // Send an error response
      return res.status(500).json({ message: 'Error signing up user', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Compare the password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Send a success response (you can also send a token if you use JWT for authentication)
      res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};