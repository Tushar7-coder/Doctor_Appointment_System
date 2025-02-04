const User = require("../models/user.model.js");
const Doctor = require('../models/doctor.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    // Check if the user already exists
    if (role === 'patient') {
      user = await User.findOne({ email });
    } else if (role === 'doctor') {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Ensure password is provided and valid
    if (!password || password.length < 5) {
      return res.status(400).json({ message: "Password should be at least 5 characters" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user based on the role
    if (role === 'patient') {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else if (role === 'doctor') {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    // Debugging step: Check if the user object is correctly created
    console.log("Created user object:", user);

    if (!user) {
      return res.status(400).json({ message: "Error creating user object." });
    }

    // Save the user to the database
    await user.save();

    // Return the response with user details (without password)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error, please try again', error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) {
      user = await Doctor.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    // Send the response with the token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user : {
        name : user.name,
        email : user.email,
        role : user.role,
      }
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error, please try again' });
  }
};
